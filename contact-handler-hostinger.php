<?php
// Optimized Contact Form Handler for Hostinger
// Uses proper mail() configuration for Hostinger servers

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', '/home/u232077031/.logs/error_log_pisoninvestment_co_tz');

// Configure mail settings for Hostinger
ini_set('SMTP', 'smtp.hostinger.com');
ini_set('smtp_port', '587');

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

    // Simple, natural subject
    $subject = "New inquiry from " . $name;

    // Clean, simple email body
    $email_body = "Hello,\n\n";
    $email_body .= "You received a new message from your website contact form.\n\n";
    $email_body .= "Name: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    if ($phone) $email_body .= "Phone: " . $phone . "\n";
    if ($company) $email_body .= "Company: " . $company . "\n";
    if ($service_display) $email_body .= "Service: " . $service_display . "\n\n";
    $email_body .= "Message:\n" . $message . "\n\n";
    $email_body .= "---\n";
    $email_body .= date('F j, Y g:i A');

    // Optimized headers for Hostinger
    $headers = array();
    $headers[] = "From: Pison Investment <" . $config['smtp']['username'] . ">";
    $headers[] = "Reply-To: " . $name . " <" . $email . ">";
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-Type: text/plain; charset=UTF-8";
    $headers[] = "X-Mailer: PHP/" . phpversion();
    
    // Send email
    $mail_sent = mail(
        $config['to_email'],
        $subject,
        $email_body,
        implode("\r\n", $headers),
        "-f" . $config['smtp']['username']
    );

    if ($mail_sent) {
        error_log("Contact form: Email sent successfully from $email ($name)");
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your message! We will get back to you within 24 hours.'
        ]);
    } else {
        throw new Exception('Failed to send email');
    }

} catch (Exception $e) {
    error_log("Contact form error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error. Please email us directly at info@pisoninvestment.co.tz'
    ]);
}
?>
