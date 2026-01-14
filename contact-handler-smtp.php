<?php
// Production Contact Form Handler with SMTP Authentication
// Uses PHPMailer for better deliverability

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', '/home/u232077031/.logs/error_log_pisoninvestment_co_tz');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://pisoninvestment.co.tz');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Check if PHPMailer is available
if (!file_exists('PHPMailer/PHPMailer.php')) {
    // Fallback to basic mail() if PHPMailer not installed
    include 'contact-handler.php';
    exit();
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

try {
    $config_file = file_exists('email-config-local.php') ? 'email-config-local.php' : 'email-config.php';
    if (!file_exists($config_file)) {
        throw new Exception('Configuration file not found');
    }
    $config = include $config_file;

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

    $service_names = [
        'fire' => 'Fire Services & Safety',
        'fumigation' => 'Fumigation & Pest Control',
        'cleaning' => 'General Cleanliness',
        'waste-management' => 'Waste Management',
        'multiple' => 'Multiple Services'
    ];
    $service_display = isset($service_names[$service]) ? $service_names[$service] : $service;

    // Create PHPMailer instance
    $mail = new PHPMailer(true);

    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = $config['smtp']['host'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp']['username'];
    $mail->Password = $config['smtp']['password'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $config['smtp']['port'];
    $mail->CharSet = 'UTF-8';

    // Sender and recipient
    $mail->setFrom($config['smtp']['username'], 'Pison Investment Website');
    $mail->addAddress($config['to_email']);
    $mail->addReplyTo($email, $name);

    // Email content
    $mail->isHTML(false);
    $mail->Subject = "Website inquiry from " . $name;
    
    $email_body = "You have received a new inquiry from your website.\n\n";
    $email_body .= "From: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    if ($phone) $email_body .= "Phone: " . $phone . "\n";
    if ($company) $email_body .= "Company: " . $company . "\n";
    if ($service_display) $email_body .= "Interested in: " . $service_display . "\n";
    $email_body .= "\n" . $message . "\n\n";
    $email_body .= "Sent on " . date('F j, Y \a\t g:i A');
    
    $mail->Body = $email_body;

    // Send email
    $mail->send();
    
    error_log("Contact form: Email sent via SMTP from $email ($name)");
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message! We will get back to you within 24 hours.',
        'debug' => [
            'method' => 'SMTP',
            'to' => $config['to_email'],
            'from' => $config['smtp']['username']
        ]
    ]);

} catch (Exception $e) {
    error_log("Contact form SMTP error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again later.',
        'debug' => [
            'error' => $e->getMessage()
        ]
    ]);
}
?>
