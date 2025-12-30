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
if (file_exists('config.php')) {
    include 'config.php';
    // $team_email, $from_email, $company_name are now loaded from config.php
} else {
    // Fallback configuration - UPDATE THESE VALUES
    $team_email = 'your-team@yourcompany.com'; // Your team's email
    $from_email = 'noreply@yourdomain.com';    // Your domain email
    $company_name = 'Your Company Name';
}

try {
    // Email to your team
    $team_subject = "New Service Inquiry from $name - Pison Investment";
    $team_message = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <title>New Service Inquiry</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            td { padding: 12px; border-bottom: 1px solid #ddd; }
            .label { font-weight: bold; background-color: #f0f0f0; width: 30%; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Service Inquiry</h2>
                <p>Pison Investment Limited</p>
            </div>
            <div class='content'>
                <p>You have received a new service inquiry through your website.</p>
                <table>
                    <tr>
                        <td class='label'>Full Name:</td>
                        <td>" . htmlspecialchars($name) . "</td>
                    </tr>
                    <tr>
                        <td class='label'>Email Address:</td>
                        <td>" . htmlspecialchars($email) . "</td>
                    </tr>
                    <tr>
                        <td class='label'>Phone Number:</td>
                        <td>" . htmlspecialchars($phone ?: 'Not provided') . "</td>
                    </tr>
                    <tr>
                        <td class='label'>Company:</td>
                        <td>" . htmlspecialchars($company ?: 'Not provided') . "</td>
                    </tr>
                    <tr>
                        <td class='label'>Service Requested:</td>
                        <td>" . htmlspecialchars($input['service'] ?? 'Not specified') . "</td>
                    </tr>
                    <tr>
                        <td class='label'>Budget Range:</td>
                        <td>" . htmlspecialchars($input['budget'] ?? 'Not specified') . "</td>
                    </tr>
                    <tr>
                        <td class='label'>Message:</td>
                        <td>" . nl2br(htmlspecialchars($message)) . "</td>
                    </tr>
                </table>
            </div>
            <div class='footer'>
                <p>Submitted on: " . date('F j, Y \a\t g:i A') . "</p>
                <p>This email was sent from your website contact form.</p>
            </div>
        </div>
    </body>
    </html>
    ";

    $team_headers = "MIME-Version: 1.0" . "\r\n";
    $team_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $team_headers .= "From: $company_name <$from_email>" . "\r\n";
    $team_headers .= "Reply-To: $name <$email>" . "\r\n";
    $team_headers .= "Return-Path: $from_email" . "\r\n";
    $team_headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $team_headers .= "X-Priority: 3" . "\r\n";
    $team_headers .= "X-MSMail-Priority: Normal" . "\r\n";
    $team_headers .= "Importance: Normal" . "\r\n";

    // Confirmation email to customer
    $customer_subject = "Thank you for contacting Pison Investment Limited";
    $customer_message = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <title>Thank you for your inquiry</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .highlight { background-color: #e0f2fe; padding: 15px; border-left: 4px solid #1e40af; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            .contact-info { background-color: #fff; padding: 15px; margin: 20px 0; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Thank You for Your Inquiry</h2>
                <p>Pison Investment Limited</p>
            </div>
            <div class='content'>
                <p>Dear " . htmlspecialchars($name) . ",</p>
                
                <p>Thank you for contacting Pison Investment Limited. We have successfully received your service inquiry and appreciate your interest in our professional services.</p>
                
                <div class='highlight'>
                    <h3>What happens next?</h3>
                    <ul>
                        <li>Our team will review your inquiry within 2-4 business hours</li>
                        <li>A service specialist will contact you within 24 hours</li>
                        <li>We'll provide you with a detailed consultation and quote</li>
                    </ul>
                </div>
                
                <h3>Your inquiry details:</h3>
                <div class='contact-info'>
                    <p><strong>Service Requested:</strong> " . htmlspecialchars($input['service'] ?? 'General Inquiry') . "</p>
                    <p><strong>Your Message:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>
                </div>
                
                <p>If you have any urgent questions or need immediate assistance, please don't hesitate to contact us directly:</p>
                
                <div class='contact-info'>
                    <p><strong>Phone:</strong> +255 715 179 901 | +255 784 167 476</p>
                    <p><strong>Email:</strong> info@pisoninvestment.co.tz</p>
                    <p><strong>Office Hours:</strong> Monday - Friday: 8:00 AM - 6:00 PM | Saturday: 9:00 AM - 2:00 PM</p>
                </div>
                
                <p>Best regards,<br>
                <strong>Pison Investment Limited Team</strong><br>
                Professional Fire Safety, Fumigation, Cleaning & Waste Management Services</p>
            </div>
            <div class='footer'>
                <p>This is an automated confirmation email. Please do not reply to this message.</p>
                <p>© " . date('Y') . " Pison Investment Limited. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    ";

    $customer_headers = "MIME-Version: 1.0" . "\r\n";
    $customer_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $customer_headers .= "From: $company_name <$from_email>" . "\r\n";
    $customer_headers .= "Reply-To: $company_name <$from_email>" . "\r\n";
    $customer_headers .= "Return-Path: $from_email" . "\r\n";
    $customer_headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $customer_headers .= "X-Priority: 3" . "\r\n";
    $customer_headers .= "X-MSMail-Priority: Normal" . "\r\n";
    $customer_headers .= "Importance: Normal" . "\r\n";

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