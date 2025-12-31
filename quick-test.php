<?php
// Quick test of the email system
echo "Testing Pison Investment Email System...\n\n";

// Simulate form data
$_POST = [
    'name' => 'Test User',
    'email' => 'test@example.com',
    'phone' => '+255123456789',
    'company' => 'Test Company',
    'service' => 'Web Development',
    'message' => 'This is a test message to verify the email system is working correctly.',
    'website' => '' // honeypot field
];

$_SERVER['REQUEST_METHOD'] = 'POST';
$_SERVER['HTTP_HOST'] = 'localhost:8000';
$_SERVER['REMOTE_ADDR'] = '127.0.0.1';
$_SERVER['HTTP_USER_AGENT'] = 'Test Script';

// Capture output
ob_start();
include 'contact-handler-advanced.php';
$output = ob_get_clean();

echo "Response from email handler:\n";
echo $output . "\n";

$response = json_decode($output, true);
if ($response && $response['success']) {
    echo "\n✅ SUCCESS: Email system is working!\n";
    echo "Message: " . $response['message'] . "\n";
} else {
    echo "\n❌ ERROR: Email system failed\n";
    if ($response && isset($response['message'])) {
        echo "Error: " . $response['message'] . "\n";
    }
}
?>