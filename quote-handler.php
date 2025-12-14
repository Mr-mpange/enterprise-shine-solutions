<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$company = trim($input['company'] ?? '');
$message = trim($input['message'] ?? '');

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name, email, and message are required']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Load configuration
if (file_exists('.env.php')) {
    include '.env.php';
    $team_email = TEAM_EMAIL;
    $from_email = FROM_EMAIL;
    $company_name = COMPANY_NAME;
} else {
    // Fallback configuration - UPDATE THESE VALUES
    $team_email = 'your-team@yourcompany.com'; // Your team's email
    $from_email = 'noreply@yourdomain.com';    // Your domain email
    $company_name = 'Your Company Name';
}

try {
    // Email to your team
    $team_subject = "New Quote Request from $name";
    $team_message = "
    <html>
    <head>
        <title>New Quote Request</title>
    </head>
    <body>
        <h2>New Quote Request</h2>
        <table style='border-collapse: collapse; width: 100%;'>
            <tr>
                <td style='border: 1px solid #ddd; padding: 8px; font-weight: bold;'>Name:</td>
                <td style='border: 1px solid #ddd; padding: 8px;'>$name</td>
            </tr>
            <tr>
                <td style='border: 1px solid #ddd; padding: 8px; font-weight: bold;'>Email:</td>
                <td style='border: 1px solid #ddd; padding: 8px;'>$email</td>
            </tr>
            <tr>
                <td style='border: 1px solid #ddd; padding: 8px; font-weight: bold;'>Phone:</td>
                <td style='border: 1px solid #ddd; padding: 8px;'>" . ($phone ?: 'Not provided') . "</td>
            </tr>
            <tr>
                <td style='border: 1px solid #ddd; padding: 8px; font-weight: bold;'>Company:</td>
                <td style='border: 1px solid #ddd; padding: 8px;'>" . ($company ?: 'Not provided') . "</td>
            </tr>
            <tr>
                <td style='border: 1px solid #ddd; padding: 8px; font-weight: bold; vertical-align: top;'>Message:</td>
                <td style='border: 1px solid #ddd; padding: 8px;'>" . nl2br(htmlspecialchars($message)) . "</td>
            </tr>
        </table>
        <hr>
        <p><em>Submitted at: " . date('Y-m-d H:i:s') . "</em></p>
    </body>
    </html>
    ";

    $team_headers = "MIME-Version: 1.0" . "\r\n";
    $team_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $team_headers .= "From: $from_email" . "\r\n";
    $team_headers .= "Reply-To: $email" . "\r\n";

    // Confirmation email to customer
    $customer_subject = "Thank you for your quote request - $company_name";
    $customer_message = "
    <html>
    <head>
        <title>Thank you for your interest!</title>
    </head>
    <body>
        <h2>Thank you for your interest!</h2>
        <p>Hi $name,</p>
        <p>We've received your quote request and our team will get back to you within 24 hours.</p>
        
        <h3>Your request details:</h3>
        <p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>
        
        <br>
        <p>Best regards,<br>$company_name Team</p>
        
        <hr>
        <p style='font-size: 12px; color: #666;'>
            If you have any questions, please reply to this email or contact us directly.
        </p>
    </body>
    </html>
    ";

    $customer_headers = "MIME-Version: 1.0" . "\r\n";
    $customer_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $customer_headers .= "From: $from_email" . "\r\n";

    // Send emails
    $team_sent = mail($team_email, $team_subject, $team_message, $team_headers);
    $customer_sent = mail($email, $customer_subject, $customer_message, $customer_headers);

    if ($team_sent && $customer_sent) {
        echo json_encode([
            'success' => true, 
            'message' => 'Quote request sent successfully! We\'ll get back to you within 24 hours.'
        ]);
    } else {
        throw new Exception('Failed to send one or more emails');
    }

} catch (Exception $e) {
    error_log("Quote form error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Failed to send quote request. Please try again later.'
    ]);
}
?>