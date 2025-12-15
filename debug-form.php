<?php
// Debug script for form submission issues
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Log all activity to a debug file
$debug_log = "form_debug.log";
$timestamp = date('Y-m-d H:i:s');

function debug_log($message) {
    global $debug_log, $timestamp;
    file_put_contents($debug_log, "[$timestamp] $message\n", FILE_APPEND);
}

debug_log("=== Form Debug Started ===");
debug_log("Request Method: " . $_SERVER['REQUEST_METHOD']);
debug_log("Content Type: " . ($_SERVER['CONTENT_TYPE'] ?? 'Not set'));

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    debug_log("OPTIONS request received - sending preflight response");
    exit(0);
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    debug_log("Invalid method: " . $_SERVER['REQUEST_METHOD']);
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed', 'debug' => 'Only POST allowed']);
    exit;
}

// Get raw input
$raw_input = file_get_contents('php://input');
debug_log("Raw input: " . $raw_input);

// Get JSON input
$input = json_decode($raw_input, true);
debug_log("Decoded JSON: " . print_r($input, true));

if (json_last_error() !== JSON_ERROR_NONE) {
    debug_log("JSON decode error: " . json_last_error_msg());
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON', 'debug' => json_last_error_msg()]);
    exit;
}

// Validate required fields
$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$company = trim($input['company'] ?? '');
$message = trim($input['message'] ?? '');

debug_log("Form data - Name: $name, Email: $email, Phone: $phone, Company: $company");

if (empty($name) || empty($email) || empty($message)) {
    debug_log("Missing required fields");
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name, email, and message are required']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    debug_log("Invalid email format: $email");
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Load configuration
if (file_exists('config.php')) {
    include 'config.php';
    debug_log("Config loaded - Team: $team_email, From: $from_email, Company: $company_name");
} else {
    debug_log("Config file not found");
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server configuration error']);
    exit;
}

try {
    // Email to your team
    $team_subject = "New Quote Request from $name";
    $team_message = "
    New Quote Request
    
    Name: $name
    Email: $email
    Phone: " . ($phone ?: 'Not provided') . "
    Company: " . ($company ?: 'Not provided') . "
    Message: $message
    
    Submitted at: " . date('Y-m-d H:i:s');

    $team_headers = "From: $from_email\r\n";
    $team_headers .= "Reply-To: $email\r\n";
    $team_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    debug_log("Attempting to send team email...");
    $team_sent = mail($team_email, $team_subject, $team_message, $team_headers);
    debug_log("Team email result: " . ($team_sent ? 'SUCCESS' : 'FAILED'));

    // Confirmation email to customer
    $customer_subject = "Thank you for your quote request - $company_name";
    $customer_message = "Hi $name,

We've received your quote request and our team will get back to you within 24 hours.

Your request details:
Message: $message

Best regards,
$company_name Team";

    $customer_headers = "From: $from_email\r\n";
    $customer_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    debug_log("Attempting to send customer email...");
    $customer_sent = mail($email, $customer_subject, $customer_message, $customer_headers);
    debug_log("Customer email result: " . ($customer_sent ? 'SUCCESS' : 'FAILED'));

    if ($team_sent && $customer_sent) {
        debug_log("Both emails sent successfully");
        echo json_encode([
            'success' => true, 
            'message' => 'Quote request sent successfully! We\'ll get back to you within 24 hours.',
            'debug' => 'Both emails sent'
        ]);
    } else {
        debug_log("One or both emails failed - Team: $team_sent, Customer: $customer_sent");
        throw new Exception('Failed to send one or more emails');
    }

} catch (Exception $e) {
    debug_log("Exception: " . $e->getMessage());
    error_log("Quote form error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Failed to send quote request. Please try again later.',
        'debug' => $e->getMessage()
    ]);
}

debug_log("=== Form Debug Ended ===");
?>