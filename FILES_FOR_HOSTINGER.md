# Files to Upload to Hostinger - Pison Investment

## Required Files for Production

Upload these files to your Hostinger `public_html/` directory:

### 1. Main Contact Handler
- **contact-handler-advanced.php** ✅ Ready for production

### 2. Email Configuration  
- **email-config.php** ✅ Updated with your settings

### 3. Apache Configuration
- **.htaccess** ✅ Updated to allow PHP contact form access

### 4. Optional Testing File
- **test-email-setup.php** (for testing only - remove after testing)

## Your React App Update

Your contact form in `src/pages/Contact.tsx` is already updated to use:
```javascript
const response = await fetch('/contact-handler-advanced.php', {
```

## Quick Deployment Steps

1. **Upload to Hostinger:**
   - Login to Hostinger File Manager
   - Go to `public_html/`
   - Upload `contact-handler-advanced.php`
   - Upload `email-config.php`

2. **Test the Setup:**
   - Upload `test-email-setup.php` temporarily
   - Visit `https://yourdomain.com/test-email-setup.php`
   - Submit test form
   - Check your inbox at info@pisoninvestment.co.tz

3. **Deploy Your React App:**
   - Build your React app: `npm run build`
   - Upload the `dist/` folder contents to `public_html/`

4. **Clean Up:**
   - Remove `test-email-setup.php` after testing
   - Remove any other test files

## Email Settings Configured

✅ **Recipient:** info@pisoninvestment.co.tz  
✅ **SMTP Host:** smtp.hostinger.com  
✅ **Port:** 587  
✅ **Username:** info@pisoninvestment.co.tz  
✅ **Password:** Pisoninvestment@25  
✅ **Encryption:** TLS  

## Features Included

- ✅ Professional HTML email templates
- ✅ Spam protection with rate limiting
- ✅ Honeypot fields for bot detection
- ✅ Input validation and sanitization
- ✅ CORS headers for web app integration
- ✅ Error handling and logging
- ✅ Mobile-responsive email design
- ✅ Both HTML and plain text versions

## Security Features

- ✅ Rate limiting (5 emails per IP per hour)
- ✅ Input sanitization
- ✅ CSRF protection
- ✅ Spam keyword detection
- ✅ Proper error handling

Your contact form is now ready for production deployment! 🚀