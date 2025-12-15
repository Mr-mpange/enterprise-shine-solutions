<?php
// SSH Email Test Script
echo "=== Email Test Results ===\n";

// Load configuration
if (file_exists('config.php')) {
    include 'config.php';
    echo "✅ Config file loaded successfully\n";
    echo "Team Email: $team_email\n";
    echo "From Email: $from_email\n";
    echo "Company Name: $company_name\n\n";
} else {
    echo "❌ Config file not found\n";
    exit(1);
}

// Test basic email function
echo "=== Testing Email Function ===\n";

$test_subject = "SSH Test Email from " . $company_name;
$test_message = "This is a test email sent via SSH to verify email functionality.\n\nTimestamp: " . date('Y-m-d H:i:s');
$test_headers = "From: $from_email\r\n";
$test_headers .= "Reply-To: $from_email\r\n";
$test_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

echo "Attempting to send test email to: $team_email\n";

if (mail($team_email, $test_subject, $test_message, $test_headers)) {
    echo "✅ Test email sent successfully!\n";
    echo "Check your inbox and spam folder for the test email.\n\n";
} else {
    echo "❌ Failed to send test email\n";
    echo "This indicates a server configuration issue.\n\n";
}

// Check PHP mail configuration
echo "=== PHP Mail Configuration ===\n";
echo "Sendmail Path: " . ini_get('sendmail_path') . "\n";
echo "SMTP: " . ini_get('SMTP') . "\n";
echo "SMTP Port: " . ini_get('smtp_port') . "\n";

// Check if mail function exists
if (function_exists('mail')) {
    echo "✅ PHP mail() function is available\n";
} else {
    echo "❌ PHP mail() function is not available\n";
}

// Check error logs
echo "\n=== Recent PHP Error Logs ===\n";
$error_log = ini_get('error_log');
if ($error_log && file_exists($error_log)) {
    echo "Error log location: $error_log\n";
    $recent_errors = shell_exec("tail -10 '$error_log' 2>/dev/null");
    if ($recent_errors) {
        echo "Recent errors:\n$recent_errors\n";
    } else {
        echo "No recent errors found.\n";
    }
} else {
    echo "Error log not found or not configured.\n";
}

echo "\n=== Test Complete ===\n";
echo "If email failed, try:\n";
echo "1. Create noreply@mpanges.com email account in Hostinger\n";
echo "2. Check spam folder\n";
echo "3. Contact Hostinger support about mail() function\n";
?>