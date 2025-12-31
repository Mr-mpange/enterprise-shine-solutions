<?php
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

// Email configuration
$to_email = 'your-email@example.com'; // Replace with your actual email
$smtp_host = 'smtp.gmail.com';
$smtp_port = 587;
$smtp_username = 'your-gmail@gmail.com'; // Replace with your Gmail
$smtp_password = 'your-app-password'; // Replace with your Gmail App Password

// Get form data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    $input = $_POST;
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

// Sanitize input
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

// Create email content with proper formatting to avoid spam
$subject = "New Contact Form Submission from " . $name;

// HTML email body
$html_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>Contact Form Submission</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
            <p>You have received a new message from your website contact form.</p>
        </div>
        
        <div class='field'>
            <div class='label'>Name:</div>
            <div class='value'>" . htmlspecialchars($name) . "</div>
        </div>
        
        <div class='field'>
            <div class='label'>Email:</div>
            <div class='value'>" . htmlspecialchars($email) . "</div>
        </div>";

if ($phone) {
    $html_body .= "
        <div class='field'>
            <div class='label'>Phone:</div>
            <div class='value'>" . htmlspecialchars($phone) . "</div>
        </div>";
}

if ($company) {
    $html_body .= "
        <div class='field'>
            <div class='label'>Company:</div>
            <div class='value'>" . htmlspecialchars($company) . "</div>
        </div>";
}

if ($service) {
    $html_body .= "
        <div class='field'>
            <div class='label'>Service:</div>
            <div class='value'>" . htmlspecialchars($service) . "</div>
        </div>";
}

$html_body .= "
        <div class='field'>
            <div class='label'>Message:</div>
            <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
        </div>
        
        <div class='footer'>
            <p>This email was sent from your website contact form on " . date('Y-m-d H:i:s') . "</p>
            <p>Sender IP: " . $_SERVER['REMOTE_ADDR'] . "</p>
        </div>
    </div>
</body>
</html>";

// Plain text version
$text_body = "New Contact Form Submission\n\n";
$text_body .= "Name: " . $name . "\n";
$text_body .= "Email: " . $email . "\n";
if ($phone) $text_body .= "Phone: " . $phone . "\n";
if ($company) $text_body .= "Company: " . $company . "\n";
if ($service) $text_body .= "Service: " . $service . "\n";
$text_body .= "Message: " . $message . "\n\n";
$text_body .= "Sent on: " . date('Y-m-d H:i:s') . "\n";
$text_body .= "Sender IP: " . $_SERVER['REMOTE_ADDR'];

// Email headers to avoid spam
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="boundary-' . md5(time()) . '"',
    'From: "Website Contact Form" <' . $smtp_username . '>',
    'Reply-To: ' . $email,
    'Return-Path: ' . $smtp_username,
    'X-Mailer: PHP/' . phpversion(),
    'X-Priority: 3',
    'X-MSMail-Priority: Normal',
    'Importance: Normal'
];

$boundary = 'boundary-' . md5(time());

// Create multipart message
$email_body = "--$boundary\r\n";
$email_body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$email_body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$email_body .= $text_body . "\r\n\r\n";
$email_body .= "--$boundary\r\n";
$email_body .= "Content-Type: text/html; charset=UTF-8\r\n";
$email_body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$email_body .= $html_body . "\r\n\r\n";
$email_body .= "--$boundary--";

// Try to send email using mail() function first
$mail_sent = false;

if (function_exists('mail')) {
    $mail_sent = mail($to_email, $subject, $email_body, implode("\r\n", $headers));
}

// If mail() fails or doesn't exist, try SMTP (requires additional setup)
if (!$mail_sent) {
    // For production, you should use PHPMailer or similar library
    // This is a basic implementation
    error_log("Failed to send email using mail() function");
}

if ($mail_sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message. We will get back to you soon!'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again later.'
    ]);
}
?>