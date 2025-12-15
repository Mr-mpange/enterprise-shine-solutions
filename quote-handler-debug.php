<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Create debug log
$debug_file = 'email_debug.log';
function log_debug($message) {
    global $debug_file;
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($debug_file, "[$timestamp] $message\n", FILE_APPEND);
}

log_debug("=== NEW FORM SUBMISSION ===");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    log_debug("OPTIONS request received");
    exit(0);
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    log_debug("Invalid method: " . $_SERVER['REQUEST_METHOD']);
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);
log_debug("Form data received: " . print_r($input, true));

// Validate required fields
$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$company = trim($input['company'] ?? '');
$service = trim($input['service'] ?? '');
$budget = trim($input['budget'] ?? '');
$message = trim($input['message'] ?? '');

if (empty($name) || empty($email) || empty($message)) {
    log_debug("Missing required fields");
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name, email, and message are required']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    log_debug("Invalid email format: $email");
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Load configuration
if (file_exists('config.php')) {
    include 'config.php';
    log_debug("Config loaded - Team: $team_email, From: $from_email");
} else {
    log_debug("Config file not found");
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server configuration error']);
    exit;
}

try {
    // Email to your team
    $team_subject = "New Contact Form Submission from $name";
    $team_message = "New Contact Form Submission

Name: $name
Email: $email
Phone: " . ($phone ?: 'Not provided') . "
Company: " . ($company ?: 'Not provided') . "
Service: " . ($service ?: 'Not specified') . "
Budget: " . ($budget ?: 'Not specified') . "

Message:
$message

Submitted at: " . date('Y-m-d H:i:s T');

    $team_headers = "From: $from_email\r\n";
    $team_headers .= "Reply-To: $email\r\n";
    $team_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    log_debug("Attempting to send team email to: $team_email");
    log_debug("Subject: $team_subject");
    log_debug("Headers: $team_headers");
    
    $team_sent = mail($team_email, $team_subject, $team_message, $team_headers);
    log_debug("Team email result: " . ($team_sent ? 'SUCCESS' : 'FAILED'));
    
    if (!$team_sent) {
        $last_error = error_get_last();
        log_debug("Last PHP error: " . print_r($last_error, true));
    }

    // Confirmation email to customer
    $customer_subject = "Thank you for contacting $company_name";
    $customer_message = "Hi $name,

Thank you for contacting us! We've received your message and our team will get back to you within 24 hours.

Your message:
$message

Best regards,
$company_name Team

---
This is an automated confirmation email.";

    $customer_headers = "From: $from_email\r\n";
    $customer_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    log_debug("Attempting to send customer confirmation to: $email");
    $customer_sent = mail($email, $customer_subject, $customer_message, $customer_headers);
    log_debug("Customer email result: " . ($customer_sent ? 'SUCCESS' : 'FAILED'));

    if ($team_sent) {
        log_debug("SUCCESS: Form processed successfully");
        echo json_encode([
            'success' => true, 
            'message' => 'Message sent successfully! We\'ll get back to you within 24 hours.',
            'debug' => "Team email: " . ($team_sent ? 'sent' : 'failed') . ", Customer email: " . ($customer_sent ? 'sent' : 'failed')
        ]);
    } else {
        throw new Exception('Failed to send team notification email');
    }

} catch (Exception $e) {
    log_debug("EXCEPTION: " . $e->getMessage());
    error_log("Contact form error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Failed to send message. Please try again later.',
        'debug' => $e->getMessage()
    ]);
}

log_debug("=== END SUBMISSION ===\n");
?>