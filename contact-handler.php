<?php
// Production Contact Form Handler for Pison Investment
// Optimized for Hostinger hosting

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', '/home/u232077031/.logs/error_log_pisoninvestment_co_tz');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://pisoninvestment.co.tz');
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

try {
    // Load configuration
    $config_file = file_exists('email-config-local.php') ? 'email-config-local.php' : 'email-config.php';
    if (!file_exists($config_file)) {
        throw new Exception('Configuration file not found');
    }
    $config = include $config_file;

    // Get form data
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        $input = $_POST;
    }

    // Check honeypot field (if configured)
    if (isset($config['security']['honeypot_field']) && !empty($input[$config['security']['honeypot_field']])) {
        // Silently reject spam
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
    $name = htmlspecialchars(trim($input['name']), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($input['email']), FILTER_VALIDATE_EMAIL);
    $phone = isset($input['phone']) ? htmlspecialchars(trim($input['phone']), ENT_QUOTES, 'UTF-8') : '';
    $company = isset($input['company']) ? htmlspecialchars(trim($input['company']), ENT_QUOTES, 'UTF-8') : '';
    $message = htmlspecialchars(trim($input['message']), ENT_QUOTES, 'UTF-8');
    $service = isset($input['service']) ? htmlspecialchars(trim($input['service']), ENT_QUOTES, 'UTF-8') : '';

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

    // Create email subject - simple and natural
    $subject = "Website inquiry from " . $name;

    // Create professional email body - optimized to avoid spam filters
    $email_body = "You have received a new inquiry from your website.\n\n";
    $email_body .= "From: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    if ($phone) $email_body .= "Phone: " . $phone . "\n";
    if ($company) $email_body .= "Company: " . $company . "\n";
    if ($service_display) $email_body .= "Interested in: " . $service_display . "\n";
    $email_body .= "\n" . $message . "\n\n";
    $email_body .= "Sent on " . date('F j, Y \a\t g:i A');

    // Email headers - improved for better deliverability
    $headers = "From: " . $config['smtp']['username'] . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Return-Path: " . $config['smtp']['username'] . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "X-Priority: 3\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";
    
    // Additional headers to avoid spam
    $headers .= "Message-ID: <" . time() . "-" . md5($email) . "@pisoninvestment.co.tz>\r\n";
    $headers .= "X-Originating-IP: " . $_SERVER['REMOTE_ADDR'] . "\r\n";

    // Send email using PHP mail() function with additional parameters
    $additional_params = "-f" . $config['smtp']['username']; // Set envelope sender
    
    // Log email attempt
    error_log("Attempting to send email to: " . $config['to_email']);
    error_log("From: " . $config['smtp']['username']);
    error_log("Subject: " . $subject);
    
    $mail_sent = mail($config['to_email'], $subject, $email_body, $headers, $additional_params);

    if ($mail_sent) {
        error_log("Contact form: Email sent successfully from $email ($name)");
        error_log("Email headers used: " . str_replace("\r\n", " | ", $headers));
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your message! We will get back to you within 24 hours.',
            'debug' => [
                'mail_sent' => true,
                'to' => $config['to_email'],
                'from' => $config['smtp']['username'],
                'subject' => $subject
            ]
        ]);
    } else {
        error_log("Contact form: mail() function returned false");
        error_log("Possible reasons: mail server issue, invalid headers, or spam filter");
        throw new Exception('Failed to send email - mail() returned false');
    }

} catch (Exception $e) {
    error_log("Contact form error: " . $e->getMessage());
    error_log("Error trace: " . $e->getTraceAsString());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again later or contact us directly at info@pisoninvestment.co.tz',
        'debug' => [
            'error' => $e->getMessage(),
            'file' => basename($e->getFile()),
            'line' => $e->getLine()
        ]
    ]);
}
?>
