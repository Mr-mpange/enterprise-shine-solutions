<?php
// Email Debug Test Script
// Upload this to your server and visit it in browser to see email configuration

header('Content-Type: text/html; charset=UTF-8');

echo "<h1>Email Configuration Debug</h1>";
echo "<hr>";

// Check if mail function exists
echo "<h2>1. PHP Mail Function</h2>";
if (function_exists('mail')) {
    echo "✅ mail() function is available<br>";
} else {
    echo "❌ mail() function is NOT available<br>";
}

// Check configuration file
echo "<h2>2. Configuration File</h2>";
$config_file = file_exists('email-config-local.php') ? 'email-config-local.php' : 'email-config.php';
if (file_exists($config_file)) {
    echo "✅ Config file found: $config_file<br>";
    $config = include $config_file;
    echo "To Email: " . $config['to_email'] . "<br>";
    echo "From Email: " . $config['smtp']['username'] . "<br>";
} else {
    echo "❌ Config file NOT found<br>";
}

// Test sending a simple email
echo "<h2>3. Test Email Send</h2>";
if (isset($config)) {
    $to = $config['to_email'];
    $subject = "Test Email - " . date('Y-m-d H:i:s');
    $message = "This is a test email sent from test-email-debug.php\n\n";
    $message .= "Time: " . date('F j, Y g:i A') . "\n";
    $message .= "Server: " . $_SERVER['SERVER_NAME'] . "\n";
    
    $headers = "From: " . $config['smtp']['username'] . "\r\n";
    $headers .= "Reply-To: " . $config['smtp']['username'] . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $additional_params = "-f" . $config['smtp']['username'];
    
    $result = mail($to, $subject, $message, $headers, $additional_params);
    
    if ($result) {
        echo "✅ Test email sent successfully!<br>";
        echo "Check your inbox (and spam folder) for: $to<br>";
    } else {
        echo "❌ Failed to send test email<br>";
        echo "Check server error logs for details<br>";
    }
}

// Check error log location
echo "<h2>4. Error Log Information</h2>";
echo "Error log location: " . ini_get('error_log') . "<br>";
echo "Log errors enabled: " . (ini_get('log_errors') ? 'Yes' : 'No') . "<br>";
echo "Display errors: " . (ini_get('display_errors') ? 'Yes' : 'No') . "<br>";

// Server information
echo "<h2>5. Server Information</h2>";
echo "PHP Version: " . phpversion() . "<br>";
echo "Server Software: " . $_SERVER['SERVER_SOFTWARE'] . "<br>";
echo "Server Name: " . $_SERVER['SERVER_NAME'] . "<br>";

echo "<hr>";
echo "<p><strong>Note:</strong> Delete this file after testing for security!</p>";
?>
