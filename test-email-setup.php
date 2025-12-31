<?php
// Test email setup
header('Content-Type: text/html; charset=UTF-8');

echo "<h2>Email Configuration Test</h2>";

// Check if mail function exists
if (function_exists('mail')) {
    echo "<p>✅ PHP mail() function is available</p>";
} else {
    echo "<p>❌ PHP mail() function is NOT available</p>";
}

// Check configuration file
$config_file = file_exists('email-config-local.php') ? 'email-config-local.php' : 'email-config.php';
if (file_exists($config_file)) {
    echo "<p>✅ Configuration file found: $config_file</p>";
    $config = include $config_file;
    
    if ($config['to_email'] === 'your-email@example.com') {
        echo "<p>⚠️ Please update the 'to_email' in $config_file</p>";
    } else {
        echo "<p>✅ Recipient email configured: " . $config['to_email'] . "</p>";
    }
    
    if ($config['smtp']['username'] === 'your-gmail@gmail.com') {
        echo "<p>⚠️ Please update SMTP settings in $config_file</p>";
    } else {
        echo "<p>✅ SMTP username configured</p>";
    }
} else {
    echo "<p>❌ Configuration file not found</p>";
}

// Check server configuration
echo "<h3>Server Information</h3>";
echo "<p>PHP Version: " . phpversion() . "</p>";
echo "<p>Server: " . $_SERVER['SERVER_SOFTWARE'] . "</p>";
echo "<p>Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "</p>";

// Test form
echo "<h3>Test Contact Form</h3>";
echo '<form method="POST" action="contact-handler-advanced.php" style="max-width: 500px;">
    <div style="margin-bottom: 15px;">
        <label>Name:</label><br>
        <input type="text" name="name" required style="width: 100%; padding: 8px;">
    </div>
    <div style="margin-bottom: 15px;">
        <label>Email:</label><br>
        <input type="email" name="email" required style="width: 100%; padding: 8px;">
    </div>
    <div style="margin-bottom: 15px;">
        <label>Phone:</label><br>
        <input type="tel" name="phone" style="width: 100%; padding: 8px;">
    </div>
    <div style="margin-bottom: 15px;">
        <label>Company:</label><br>
        <input type="text" name="company" style="width: 100%; padding: 8px;">
    </div>
    <div style="margin-bottom: 15px;">
        <label>Service:</label><br>
        <select name="service" style="width: 100%; padding: 8px;">
            <option value="">Select a service</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Consulting">Consulting</option>
            <option value="Other">Other</option>
        </select>
    </div>
    <div style="margin-bottom: 15px;">
        <label>Message:</label><br>
        <textarea name="message" required rows="5" style="width: 100%; padding: 8px;"></textarea>
    </div>
    <input type="hidden" name="website" value="">
    <button type="submit" style="background: #667eea; color: white; padding: 12px 24px; border: none; border-radius: 4px; cursor: pointer;">Send Test Email</button>
</form>';

echo "<h3>Setup Instructions</h3>";
echo "<ol>
    <li>Copy <code>email-config.php</code> to <code>email-config-local.php</code></li>
    <li>Update the email addresses and SMTP settings in <code>email-config-local.php</code></li>
    <li>For Gmail, use an App Password instead of your regular password</li>
    <li>Test the form above to verify everything works</li>
    <li>Use <code>contact-handler-advanced.php</code> as your form action URL</li>
</ol>";

echo "<h3>Tips to Avoid Spam Folder</h3>";
echo "<ul>
    <li>✅ Use proper email headers (implemented)</li>
    <li>✅ Include both HTML and plain text versions (implemented)</li>
    <li>✅ Use professional email templates (implemented)</li>
    <li>✅ Include sender information and timestamps (implemented)</li>
    <li>✅ Implement rate limiting (implemented)</li>
    <li>✅ Use honeypot fields for spam detection (implemented)</li>
    <li>⚠️ Configure SPF, DKIM, and DMARC records for your domain</li>
    <li>⚠️ Use a dedicated SMTP service like SendGrid or Mailgun for production</li>
</ul>";
?>