<?php
// Enhanced contact form handler with SMTP and spam prevention
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Load configuration
$config_file = file_exists('email-config-local.php') ? 'email-config-local.php' : 'email-config.php';
$config = include $config_file;

// Rate limiting (basic implementation)
session_start();
$ip = $_SERVER['REMOTE_ADDR'];
$current_time = time();
$rate_limit_key = 'email_rate_' . md5($ip);

if (!isset($_SESSION[$rate_limit_key])) {
    $_SESSION[$rate_limit_key] = [];
}

// Clean old entries (older than 1 hour)
$_SESSION[$rate_limit_key] = array_filter($_SESSION[$rate_limit_key], function($timestamp) use ($current_time) {
    return ($current_time - $timestamp) < 3600;
});

// Check rate limit
if (count($_SESSION[$rate_limit_key]) >= $config['security']['rate_limit']) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Too many requests. Please try again later.']);
    exit();
}

// Get form data
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

// Check honeypot field (should be empty)
if (!empty($input[$config['security']['honeypot_field']])) {
    // Silently reject (likely spam)
    echo json_encode(['success' => true, 'message' => 'Thank you for your message.']);
    exit();
}

// Validate required fields
$required_fields = ['name', 'email', 'message'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Field '$field' is required"]);
        exit();
    }
}

// Sanitize and validate input
$name = filter_var(trim($input['name']), FILTER_SANITIZE_STRING);
$email = filter_var(trim($input['email']), FILTER_VALIDATE_EMAIL);
$phone = isset($input['phone']) ? filter_var(trim($input['phone']), FILTER_SANITIZE_STRING) : '';
$company = isset($input['company']) ? filter_var(trim($input['company']), FILTER_SANITIZE_STRING) : '';
$message = filter_var(trim($input['message']), FILTER_SANITIZE_STRING);
$service = isset($input['service']) ? filter_var(trim($input['service']), FILTER_SANITIZE_STRING) : '';

if (!$email) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

// Additional spam checks
$spam_keywords = ['viagra', 'casino', 'lottery', 'winner', 'congratulations', 'click here', 'free money'];
$message_lower = strtolower($message);
foreach ($spam_keywords as $keyword) {
    if (strpos($message_lower, $keyword) !== false) {
        // Log potential spam but don't reject immediately
        error_log("Potential spam detected from $email: contains '$keyword'");
    }
}

// Create professional email content
$subject = $config['email_settings']['subject_prefix'] . "New inquiry from " . $name;

// HTML email template
$html_body = '
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submission</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 30px;
        }
        .field {
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
        }
        .field:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        .label {
            font-weight: 600;
            color: #555;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .value {
            font-size: 16px;
            color: #333;
            word-wrap: break-word;
        }
        .message-content {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            border-left: 4px solid #667eea;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #eee;
        }
        .metadata {
            margin-top: 10px;
            font-size: 11px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">You have received a new inquiry from your website</p>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="label">Full Name</div>
                <div class="value">' . htmlspecialchars($name) . '</div>
            </div>
            
            <div class="field">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #667eea; text-decoration: none;">' . htmlspecialchars($email) . '</a></div>
            </div>';

if ($phone) {
    $html_body .= '
            <div class="field">
                <div class="label">Phone Number</div>
                <div class="value"><a href="tel:' . htmlspecialchars($phone) . '" style="color: #667eea; text-decoration: none;">' . htmlspecialchars($phone) . '</a></div>
            </div>';
}

if ($company) {
    $html_body .= '
            <div class="field">
                <div class="label">Company</div>
                <div class="value">' . htmlspecialchars($company) . '</div>
            </div>';
}

if ($service) {
    $html_body .= '
            <div class="field">
                <div class="label">Service Interest</div>
                <div class="value">' . htmlspecialchars($service) . '</div>
            </div>';
}

$html_body .= '
            <div class="field">
                <div class="label">Message</div>
                <div class="value">
                    <div class="message-content">' . nl2br(htmlspecialchars($message)) . '</div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Submission Details</strong></p>
            <div class="metadata">
                <p>Received: ' . date('F j, Y \a\t g:i A T') . '</p>
                <p>IP Address: ' . $_SERVER['REMOTE_ADDR'] . '</p>
                <p>User Agent: ' . htmlspecialchars($_SERVER['HTTP_USER_AGENT'] ?? 'Unknown') . '</p>
            </div>
        </div>
    </div>
</body>
</html>';

// Plain text version for better compatibility
$text_body = "NEW CONTACT FORM SUBMISSION\n";
$text_body .= str_repeat("=", 50) . "\n\n";
$text_body .= "Name: " . $name . "\n";
$text_body .= "Email: " . $email . "\n";
if ($phone) $text_body .= "Phone: " . $phone . "\n";
if ($company) $text_body .= "Company: " . $company . "\n";
if ($service) $text_body .= "Service: " . $service . "\n";
$text_body .= "\nMessage:\n" . str_repeat("-", 20) . "\n";
$text_body .= $message . "\n";
$text_body .= str_repeat("-", 20) . "\n\n";
$text_body .= "Submission Details:\n";
$text_body .= "Date: " . date('Y-m-d H:i:s T') . "\n";
$text_body .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n";

// Enhanced headers for better deliverability
$boundary = 'boundary-' . md5(uniqid(time()));
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
    'From: "' . $config['email_settings']['from_name'] . '" <' . $config['smtp']['username'] . '>',
    'Reply-To: "' . $name . '" <' . $email . '>',
    'Return-Path: ' . $config['smtp']['username'],
    'X-Mailer: ContactForm/1.0',
    'X-Priority: 3',
    'X-MSMail-Priority: Normal',
    'Importance: Normal',
    'Message-ID: <' . md5(uniqid(time())) . '@' . $_SERVER['HTTP_HOST'] . '>',
    'Date: ' . date('r'),
    'List-Unsubscribe: <mailto:' . $config['smtp']['username'] . '?subject=Unsubscribe>'
];

// Create multipart message body
$email_body = "--$boundary\r\n";
$email_body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$email_body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$email_body .= $text_body . "\r\n\r\n";
$email_body .= "--$boundary\r\n";
$email_body .= "Content-Type: text/html; charset=UTF-8\r\n";
$email_body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$email_body .= $html_body . "\r\n\r\n";
$email_body .= "--$boundary--";

// Send email
$mail_sent = false;

try {
    // Use PHP's mail() function with proper headers
    $mail_sent = mail(
        $config['to_email'],
        $subject,
        $email_body,
        implode("\r\n", $headers)
    );
    
    if ($mail_sent) {
        // Add to rate limit tracking
        $_SESSION[$rate_limit_key][] = $current_time;
        
        // Log successful submission
        if ($config['email_settings']['enable_logging']) {
            error_log("Contact form submission from $email ($name) sent successfully");
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your message! We will get back to you within 24 hours.'
        ]);
    } else {
        throw new Exception('Mail function returned false');
    }
    
} catch (Exception $e) {
    // Log error
    error_log("Contact form error: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again later or contact us directly.'
    ]);
}
?>