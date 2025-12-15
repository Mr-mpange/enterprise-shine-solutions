<?php
// Test email script to debug email issues
header('Content-Type: text/html; charset=UTF-8');

echo "<h2>Email Test Results</h2>";

// Load configuration
if (file_exists('config.php')) {
    include 'config.php';
    echo "<p>✅ Config file loaded successfully</p>";
    echo "<p><strong>Team Email:</strong> $team_email</p>";
    echo "<p><strong>From Email:</strong> $from_email</p>";
    echo "<p><strong>Company Name:</strong> $company_name</p>";
} else {
    echo "<p>❌ Config file not found</p>";
    exit;
}

// Test basic email function
echo "<h3>Testing Email Function</h3>";

$test_subject = "Test Email from " . $company_name;
$test_message = "This is a test email to verify email functionality works on your server.";
$test_headers = "From: $from_email\r\n";
$test_headers .= "Reply-To: $from_email\r\n";
$test_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

echo "<p>Attempting to send test email...</p>";

if (mail($team_email, $test_subject, $test_message, $test_headers)) {
    echo "<p>✅ Test email sent successfully to $team_email</p>";
    echo "<p>Check your inbox (and spam folder) for the test email.</p>";
} else {
    echo "<p>❌ Failed to send test email</p>";
    echo "<p>This indicates a server configuration issue.</p>";
}

// Check PHP mail configuration
echo "<h3>PHP Mail Configuration</h3>";
echo "<p><strong>Sendmail Path:</strong> " . ini_get('sendmail_path') . "</p>";
echo "<p><strong>SMTP:</strong> " . ini_get('SMTP') . "</p>";
echo "<p><strong>smtp_port:</strong> " . ini_get('smtp_port') . "</p>";

// Check if mail function exists
if (function_exists('mail')) {
    echo "<p>✅ PHP mail() function is available</p>";
} else {
    echo "<p>❌ PHP mail() function is not available</p>";
}

echo "<hr>";
echo "<p><em>Upload this file to your server and visit it in your browser to test email functionality.</em></p>";
echo "<p><em>After testing, delete this file for security.</em></p>";
?>