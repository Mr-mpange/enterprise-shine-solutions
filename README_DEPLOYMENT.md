# 🚀 Production Deployment Guide

## 📦 Files Ready for Production

### PHP Backend Files:
- ✅ `contact-handler.php` - Production-ready contact form handler
- ✅ `email-config.php` - Email configuration

### React Frontend:
- Build with: `npm run build`
- Upload from: `dist/` folder

---

## 🔧 Deployment Steps

### 1. Build Your React App
```bash
npm run build
```

### 2. Upload to Hostinger

Upload these files to `public_html/`:
- `contact-handler.php`
- `email-config.php`
- All contents from `dist/` folder

### 3. Set File Permissions
```
contact-handler.php → 644
email-config.php → 644
```

### 4. Test Your Contact Form
Visit: `https://pisoninvestment.co.tz/contact`

---

## 📧 Email Configuration

**Recipient:** info@pisoninvestment.co.tz  
**SMTP:** Configured via Hostinger's mail() function  
**Reply-To:** Customer's email address

---

## 🔐 Security Features

✅ CORS restricted to your domain  
✅ Input sanitization (XSS protection)  
✅ Email validation  
✅ Honeypot spam protection  
✅ Method validation (POST only)  
✅ Error logging (not displayed to users)

---

## 📁 Final File Structure on Hostinger

```
public_html/
├── index.html                 (from dist/)
├── assets/                    (from dist/)
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
├── contact-handler.php        ⭐ Upload this
└── email-config.php           ⭐ Upload this
```

---

## 🧪 Testing Checklist

After deployment, test:

- [ ] Navigate to contact page
- [ ] Fill out form with valid data
- [ ] Submit form
- [ ] Verify success message appears
- [ ] Check email arrives at info@pisoninvestment.co.tz
- [ ] Verify reply-to address is correct
- [ ] Test on mobile device
- [ ] Check spam folder if email doesn't arrive

---

## 🔍 Troubleshooting

### Email Not Sending?

1. **Check Hostinger Email Account**
   - Verify `info@pisoninvestment.co.tz` exists
   - Check email quota isn't full

2. **Check PHP Error Logs**
   - Hostinger Control Panel → Advanced → Error Logs
   - Look for contact form errors

3. **Verify SMTP Credentials**
   - Check `email-config.php` settings
   - Test sending email from Hostinger webmail

### Form Not Submitting?

1. **Check Browser Console**
   - Look for JavaScript errors
   - Verify fetch request completes

2. **Check Network Tab**
   - Verify POST request to `/contact-handler.php`
   - Check response status code

3. **Verify File Upload**
   - Ensure `contact-handler.php` is in root
   - Check file permissions (644)

---

## 📱 Features

✅ Professional email formatting  
✅ Customer information capture  
✅ Service selection  
✅ Automatic reply-to setup  
✅ Submission tracking (IP, date, user agent)  
✅ Mobile responsive  
✅ Fallback to mailto: if server fails  

---

## 🎯 What Happens When Form is Submitted

1. User fills out contact form
2. JavaScript validates required fields
3. Data sent to `/contact-handler.php` via POST
4. PHP validates and sanitizes input
5. Email formatted and sent via Hostinger mail()
6. Success/error response returned as JSON
7. User sees confirmation message

---

## 💡 Pro Tips

- **First deployment?** Check spam folder for test emails
- **Email formatting issues?** View email source to debug
- **Need HTML emails?** Contact form uses plain text for reliability
- **Rate limiting?** Not implemented - add if needed
- **Multiple recipients?** Update `to_email` in config

---

## 🔄 Updating After Deployment

### To Update Frontend:
```bash
npm run build
```
Upload new `dist/` contents

### To Update Backend:
Just upload modified PHP files

### To Update Email Settings:
Edit `email-config.php` and re-upload

---

## 📞 Support

**Email Issues:** Contact Hostinger support  
**Form Issues:** Check browser console and PHP error logs  
**General Help:** info@pisoninvestment.co.tz

---

**Ready to go live!** 🎉

Your contact form is production-ready and optimized for Hostinger.
