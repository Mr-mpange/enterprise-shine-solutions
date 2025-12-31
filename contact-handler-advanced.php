<?php
// Production Contact Form Handler for Pison Investment
// Optimized for Hostinger hosting with proper SMTP authentication

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

// Simple SMTP class for sending emails
class SimpleSMTP {
    private $host;
    private $port;
    private $username;
    private $password;
    private $encryption;
    private $socket;
    
    public function __construct($host, $port, $username, $password, $encryption = 'tls') {
        $this->host = $host;
        $this->port = $port;
        $this->username = $username;
        $this->password = $password;
        $this->encryption = $encryption;
    }
    
    public function send($to, $subject, $body, $headers = []) {
        try {
            // Create socket connection
            $context = stream_context_create([
                'ssl' => [
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                ]
            ]);
            
            if ($this->encryption === 'ssl') {
                $this->socket = stream_socket_client("ssl://{$this->host}:{$this->port}", $errno, $errstr, 30, STREAM_CLIENT_CONNECT, $context);
            } else {
                $this->socket = stream_socket_client("{$this->host}:{$this->port}", $errno, $errstr, 30, STREAM_CLIENT_CONNECT, $context);
            }
            
            if (!$this->socket) {
                throw new Exception("Failed to connect to SMTP server: $errstr ($errno)");
            }
            
            // Read server greeting
            $this->readResponse();
            
            // Send EHLO
            $this->sendCommand("EHLO " . ($_SERVER['HTTP_HOST'] ?? 'localhost'));
            
            // Start TLS if required
            if ($this->encryption === 'tls') {
                $this->sendCommand("STARTTLS");
                stream_socket_enable_crypto($this->socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
                $this->sendCommand("EHLO " . ($_SERVER['HTTP_HOST'] ?? 'localhost'));
            }
            
            // Authenticate
            $this->sendCommand("AUTH LOGIN");
            $this->sendCommand(base64_encode($this->username));
            $this->sendCommand(base64_encode($this->password));
            
            // Send email
            $this->sendCommand("MAIL FROM: <{$this->username}>");
            $this->sendCommand("RCPT TO: <$to>");
            $this->sendCommand("DATA");
            
            // Send headers and body
            $email_data = "Subject: $subject\r\n";
            $email_data .= implode("\r\n", $headers) . "\r\n\r\n";
            $email_data .= $body . "\r\n.\r\n";
            
            fwrite($this->socket, $email_data);
            $this->readResponse();
            
            // Quit
            $this->sendCommand("QUIT");
            fclose($this->socket);
            
            return true;
            
        } catch (Exception $e) {
            error_log("SMTP Error: " . $e->getMessage());
            if ($this->socket) {
                fclose($this->socket);
            }
            return false;
        }
    }
    
    private function sendCommand($command) {
        fwrite($this->socket, $command . "\r\n");
        return $this->readResponse();
    }
    
    private function readResponse() {
        $response = '';
        while (($line = fgets($this->socket, 515)) !== false) {
            $response .= $line;
            if (substr($line, 3, 1) === ' ') {
                break;
            }
        }
        return $response;
    }
}

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

// Map service codes to readable names
$service_names = [
    'fire' => 'Fire Services & Safety',
    'fumigation' => 'Fumigation & Pest Control',
    'cleaning' => 'General Cleanliness',
    'waste-management' => 'Waste Management',
    'multiple' => 'Multiple Services'
];
$service_display = isset($service_names[$service]) ? $service_names[$service] : $service;

// Create email content
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
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
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
            border-left: 4px solid #3b82f6;
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
        .logo {
            color: #f59e0b;
            font-weight: bold;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">PISON INVESTMENT LIMITED</div>
            <h1>New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Website Inquiry Received</p>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="label">Full Name</div>
                <div class="value">' . htmlspecialchars($name) . '</div>
            </div>
            
            <div class="field">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #3b82f6; text-decoration: none;">' . htmlspecialchars($email) . '</a></div>
            </div>';

if ($phone) {
    $html_body .= '
            <div class="field">
                <div class="label">Phone Number</div>
                <div class="value"><a href="tel:' . htmlspecialchars($phone) . '" style="color: #3b82f6; text-decoration: none;">' . htmlspecialchars($phone) . '</a></div>
            </div>';
}

if ($company) {
    $html_body .= '
            <div class="field">
                <div class="label">Company</div>
                <div class="value">' . htmlspecialchars($company) . '</div>
            </div>';
}

if ($service_display) {
    $html_body .= '
            <div class="field">
                <div class="label">Service Interest</div>
                <div class="value">' . htmlspecialchars($service_display) . '</div>
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
            <p style="margin-top: 15px; color: #3b82f6;">
                <strong>Pison Investment Limited</strong><br>
                Fire Safety • Fumigation • Cleaning • Waste Management
            </p>
        </div>
    </div>
</body>
</html>';

// Enhanced headers for better deliverability
$boundary = 'boundary-' . md5(uniqid(time()));
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
    'From: "' . $config['email_settings']['from_name'] . '" <' . $config['smtp']['username'] . '>',
    'Reply-To: "' . $name . '" <' . $email . '>',
    'Return-Path: ' . $config['smtp']['username'],
    'X-Mailer: PisonInvestment/1.0',
    'X-Priority: 3',
    'Date: ' . date('r'),
    'Message-ID: <' . md5(uniqid(time())) . '@pisoninvestment.co.tz>'
];

// Plain text version
$text_body = "NEW CONTACT FORM SUBMISSION - PISON INVESTMENT LIMITED\n";
$text_body .= str_repeat("=", 60) . "\n\n";
$text_body .= "Name: " . $name . "\n";
$text_body .= "Email: " . $email . "\n";
if ($phone) $text_body .= "Phone: " . $phone . "\n";
if ($company) $text_body .= "Company: " . $company . "\n";
if ($service_display) $text_body .= "Service: " . $service_display . "\n";
$text_body .= "\nMessage:\n" . str_repeat("-", 30) . "\n";
$text_body .= $message . "\n";
$text_body .= str_repeat("-", 30) . "\n\n";
$text_body .= "Submission Details:\n";
$text_body .= "Date: " . date('Y-m-d H:i:s T') . "\n";
$text_body .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n\n";
$text_body .= "---\n";
$text_body .= "Pison Investment Limited\n";
$text_body .= "Fire Safety • Fumigation • Cleaning • Waste Management\n";
$text_body .= "info@pisoninvestment.co.tz\n";

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

// Send email using SMTP
$smtp = new SimpleSMTP(
    $config['smtp']['host'],
    $config['smtp']['port'],
    $config['smtp']['username'],
    $config['smtp']['password'],
    $config['smtp']['encryption']
);

$mail_sent = $smtp->send($config['to_email'], $subject, $email_body, $headers);

if ($mail_sent) {
    // Add to rate limit tracking
    $_SESSION[$rate_limit_key][] = $current_time;
    
    // Log successful submission
    if ($config['email_settings']['enable_logging']) {
        error_log("Contact form submission from $email ($name) sent successfully via SMTP");
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message! We will get back to you within 24 hours.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again later or contact us directly at info@pisoninvestment.co.tz'
    ]);
}
?>