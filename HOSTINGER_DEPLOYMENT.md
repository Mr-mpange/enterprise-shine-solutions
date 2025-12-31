# Hostinger Deployment Guide - Pison Investment Contact Form

## Files to Upload to Hostinger

### Required PHP Files (Upload to public_html/)
1. **contact-handler-advanced.php** - Main contact form handler
2. **email-config.php** - Email configuration template
3. **email-config-local.php** - Your actual email settings (create from template)

### Optional Files (for testing)
- **test-email-setup.php** - Test page to verify email setup
- **quick-test.php** - Command line test script

## Step-by-Step Deployment

### 1. Upload Files to Hostinger
- Login to your Hostinger control panel
- Go to File Manager
- Navigate to `public_html/` directory
- Upload the required PHP files

### 2. Configure Email Settings
Edit `email-config-local.php` with your actual settings:

```php
<?php
return [
    // Your actual email where form submissions will be sent
    'to_email' => 'info@pisoninvestment.co.tz',
    
    // Hostinger SMTP settings
    'smtp' => [
        'host' => 'smtp.hostinger.com',
        'port' => 587,
        'username' => 'info@pisoninvestment.co.tz',
        'password' => 'YOUR_EMAIL_PASSWORD', // Replace with actual password
        'encryption' => 'tls'
    ],
    
    // Email settings
    'email_settings' => [
        'from_name' => 'Pison Investment Website',
        'subject_prefix' => 'Website Contact: ',
        'enable_html' => true,
        'enable_logging' => true
    ],
    
    // Security settings
    'security' => [
        'allowed_origins' => ['https://pisoninvestment.co.tz'], // Your domain
        'rate_limit' => 5,
        'honeypot_field' => 'website',
        'require_referer' => true // Enable in production
    ]
];
?>
```

### 3. Test the Setup
1. Upload `test-email-setup.php`
2. Visit `https://yourdomain.com/test-email-setup.php`
3. Fill out and submit the test form
4. Check your email inbox

### 4. Update Your Website
Make sure your React app is built and deployed, and the contact form points to:
```
https://yourdomain.com/contact-handler-advanced.php
```

## Security Recommendations

### 1. File Permissions
Set proper file permissions in Hostinger:
- PHP files: 644
- Config files: 600 (if possible)

### 2. Hide Config Files
Add to `.htaccess` in public_html/:
```apache
<Files "email-config*.php">
    Order Allow,Deny
    Deny from all
</Files>
```

### 3. Enable HTTPS
- Ensure SSL certificate is active
- Force HTTPS redirects
- Update CORS settings to use HTTPS

### 4. Monitor Logs
- Check Hostinger error logs regularly
- Monitor for spam attempts
- Review successful submissions

## Troubleshooting

### Common Issues:

1. **SMTP Connection Failed**
   - Verify Hostinger SMTP settings
   - Check email password
   - Ensure port 587 is open

2. **Permission Denied**
   - Check file permissions
   - Verify PHP version compatibility

3. **CORS Errors**
   - Update allowed origins in config
   - Check HTTPS settings

4. **Rate Limiting**
   - Adjust rate limits in config
   - Clear PHP sessions if needed

### Hostinger Specific Settings:

1. **PHP Version**: Use PHP 8.0 or higher
2. **Memory Limit**: Default should be sufficient
3. **Execution Time**: 30 seconds is adequate
4. **File Upload**: Not needed for contact form

## Email Deliverability Tips

### To Avoid Spam Folder:
1. ✅ Use proper SMTP authentication (implemented)
2. ✅ Include both HTML and text versions (implemented)
3. ✅ Use professional email templates (implemented)
4. ✅ Include proper headers (implemented)
5. ✅ Rate limiting (implemented)
6. ⚠️ Set up SPF record for your domain
7. ⚠️ Set up DKIM signing
8. ⚠️ Configure DMARC policy

### DNS Records to Add:
```
SPF: v=spf1 include:_spf.hostinger.com ~all
DKIM: Contact Hostinger support for DKIM setup
DMARC: v=DMARC1; p=quarantine; rua=mailto:info@pisoninvestment.co.tz
```

## Production Checklist

- [ ] Upload all PHP files to public_html/
- [ ] Configure email-config-local.php with real settings
- [ ] Test contact form functionality
- [ ] Verify emails arrive in inbox (not spam)
- [ ] Set up proper file permissions
- [ ] Add .htaccess security rules
- [ ] Enable HTTPS and update CORS
- [ ] Configure DNS records for email deliverability
- [ ] Monitor error logs
- [ ] Test rate limiting
- [ ] Verify mobile responsiveness

## Support

If you encounter issues:
1. Check Hostinger error logs
2. Test with test-email-setup.php
3. Verify SMTP settings with your email provider
4. Contact Hostinger support for server-specific issues

---

**Note**: Replace all placeholder values with your actual domain and email settings before deployment.