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
        'password' => getenv('SMTP_PASSWORD') ?: 'Pisoninvestment@25', // Use environment variable or fallback
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
        'allowed_origins' => ['https://pisoninvestment.co.tz', 'https://www.pisoninvestment.co.tz'],
        'honeypot_field' => 'website', // Hidden field to catch bots
    ]
];
?>