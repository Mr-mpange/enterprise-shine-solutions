<?php
// Email Configuration
// Copy this file and rename to email-config-local.php for your local settings

return [
    // Recipient email (where form submissions will be sent)
    'to_email' => 'info@pisoninvestment.co.tz',
    
    // SMTP Configuration (for better deliverability)
    'smtp' => [
        'host' => 'smtp.hostinger.com', // Hostinger SMTP server
        'port' => 587,
        'username' => 'info@pisoninvestment.co.tz',
        'password' => 'Pisoninvestment@25', // Your email password
        'encryption' => 'tls'
    ],
    
    // Email settings to avoid spam
    'email_settings' => [
        'from_name' => 'Website Contact Form',
        'subject_prefix' => 'Contact Form: ',
        'enable_html' => true,
        'enable_logging' => true
    ],
    
    // Security settings
    'security' => [
        'allowed_origins' => ['*'], // Change to your domain in production
        'rate_limit' => 5, // Max emails per IP per hour
        'honeypot_field' => 'website', // Hidden field to catch bots
        'require_referer' => false // Set to true in production
    ]
];
?>