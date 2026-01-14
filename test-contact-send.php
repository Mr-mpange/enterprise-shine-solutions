<?php
// Test Contact Form Submission
header('Content-Type: text/html; charset=UTF-8');

echo "<h1>Contact Form Test</h1>";
echo "<hr>";

// Load config
$config_file = file_exists('email-config-local.php') ? 'email-config-local.php' : 'email-config.php';
if (!file_exists($config_file)) {
    die("❌ Config file not found");
}
$config = include $config_file;

echo "<h2>Configuration</h2>";
echo "To: " . $config['to_email'] . "<br>";
echo "From: " . $config['smtp']['username'] . "<br>";
echo "SMTP Host: " . $config['smtp']['host'] . "<br>";
echo "SMTP Port: " . $config['smtp']['port'] . "<br>";

// Test data
$name = "Test User";
$email = "test@example.com";
$message = "This is a test message sent at " . date('Y-m-d H:i:s');

$subject = "Test - New inquiry from " . $name;

$email_body = "Hello,\n\n";
$email_body .= "You received a new message from your website contact form.\n\n";
$email_body .= "Name: " . $name . "\n";
$email_body .= "Email: " . $email . "\n";
$email_body .= "Message:\n" . $message . "\n\n";
$email_body .= "---\n";
$email_body .= date('F j, Y g:i A');

$headers = array();
$headers[] = "From: Pison Investment <" . $config['smtp']['username'] . ">";
$headers[] = "Reply-To: " . $name . " <" . $email . ">";
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";
$headers[] = "X-Mailer: PHP/" . phpversion();

echo "<h2>Sending Test Email...</h2>";
echo "Subject: " . $subject . "<br>";
echo "To: " . $config['to_email'] . "<br><br>";

$mail_sent = mail(
    $config['to_email'],
    $subject,
    $email_body,
    implode("\r\n", $headers),
    "-f" . $config['smtp']['username']
);

if ($mail_sent) {
    echo "✅ <strong>mail() function returned TRUE</strong><br>";
    echo "Email should be sent. Check your inbox AND spam folder.<br>";
    echo "<br>If you don't see it anywhere:<br>";
    echo "1. Check Hostinger email logs in control panel<br>";
    echo "2. Verify email account exists: " . $config['smtp']['username'] . "<br>";
    echo "3. Check email quota is not full<br>";
} else {
    echo "❌ <strong>mail() function returned FALSE</strong><br>";
    echo "Email was NOT sent. Possible reasons:<br>";
    echo "- Email account doesn't exist<br>";
    echo "- Email quota is full<br>";
    echo "- Server mail configuration issue<br>";
    echo "- Check error logs: /home/u232077031/.logs/error_log_pisoninvestment_co_tz<br>";
}

echo "<hr>";
echo "<h2>Headers Used:</h2>";
echo "<pre>" . implode("\n", $headers) . "</pre>";

echo "<h2>Email Body:</h2>";
echo "<pre>" . htmlspecialchars($email_body) . "</pre>";

echo "<hr>";
echo "<p><strong>Delete this file after testing!</strong></p>";
?>
