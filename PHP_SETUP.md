# PHP Email Setup for Hostinger

## 1. Upload Files to Hostinger

Upload these files to your Hostinger public_html directory:
- `quote-handler.php` - The PHP script that handles form submissions
- `config.php` - Your email settings (copy from config.php.example)
- Your React build files (after running `npm run build`)

## 2. Configure Email Settings (EASY WAY)

1. Copy `config.php.example` to `config.php`
2. Edit `config.php` and change these 3 lines:
```php
$team_email = 'your-team@yourcompany.com';     // YOUR team email
$from_email = 'noreply@yourdomain.com';        // YOUR domain email
$company_name = 'Your Company Name';           // YOUR company name
```

**Example:**
```php
$team_email = 'sales@mycompany.com';           // Where quotes go
$from_email = 'noreply@mycompany.com';         // From your domain
$company_name = 'My Amazing Company';          // Your business name
```

**Important for Hostinger:**
- `$from_email` MUST be an email address from your domain (e.g., noreply@yourdomain.com)
- You can create this email in Hostinger's Email section
- Don't use Gmail or other external emails as the "From" address

## 3. Test the Setup

1. Build your React app: `npm run build`
2. Upload the `dist/` folder contents to `public_html/`
3. Upload `quote-handler.php` to `public_html/`
4. Visit your website and test the form

## 4. Hostinger Email Configuration

### Option A: Use Hostinger's Email Service
1. Go to Hostinger Panel → Email
2. Create an email account (e.g., noreply@yourdomain.com)
3. Use this email as `$from_email` in the PHP script

### Option B: Use External SMTP (Advanced)
If you need more reliable email delivery, you can modify the script to use PHPMailer with SMTP:

```php
// Add this to use external SMTP like Gmail
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'your-email@gmail.com';
$mail->Password = 'your-app-password';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
```

## 5. File Structure on Hostinger

```
public_html/
├── index.html (your React app)
├── assets/ (React build assets)
├── quote-handler.php
├── config.php (your email settings)
└── other files...
```

## 6. Troubleshooting

- **Emails not sending**: Check that `$from_email` uses your domain
- **CORS errors**: The PHP script includes CORS headers
- **Form not submitting**: Check browser console for errors
- **500 errors**: Check Hostinger error logs in the control panel

## 7. Security Notes

- The script validates and sanitizes all inputs
- HTML is escaped to prevent XSS attacks
- Only POST requests are allowed
- Email addresses are validated

Your quote form will now work perfectly on Hostinger!