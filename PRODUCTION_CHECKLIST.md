# ✅ Production Deployment Checklist

## 🎯 Pre-Deployment

- [ ] Review `email-config.php` - verify email address
- [ ] Check SMTP password is correct
- [ ] Test build locally: `npm run build`
- [ ] Review contact form fields
- [ ] Verify all links work

---

## 📦 Files to Upload

### Required Files (2):
- [ ] `contact-handler.php`
- [ ] `email-config.php`

### Built React App:
- [ ] Run `npm run build`
- [ ] Upload all files from `dist/` folder

---

## 🚀 Deployment

- [ ] Login to Hostinger File Manager
- [ ] Navigate to `public_html/`
- [ ] Upload PHP files to root
- [ ] Upload React build files
- [ ] Set permissions: 644 for PHP files

---

## 🧪 Post-Deployment Testing

- [ ] Visit: `https://pisoninvestment.co.tz`
- [ ] Navigate to Contact page
- [ ] Fill out form with test data
- [ ] Submit form
- [ ] Verify success message
- [ ] Check email arrives at info@pisoninvestment.co.tz
- [ ] Verify reply-to works
- [ ] Test on mobile device
- [ ] Test "Email Our Support Team" button

---

## 🔐 Security Check

- [ ] CORS set to your domain (not `*`)
- [ ] Error display disabled in production
- [ ] Email password not exposed in frontend
- [ ] Input sanitization working
- [ ] Honeypot field in place

---

## 📧 Email Verification

- [ ] Email account exists: info@pisoninvestment.co.tz
- [ ] Email quota not full
- [ ] Can send from Hostinger webmail
- [ ] Check spam folder for test emails
- [ ] Reply-to address correct

---

## 🐛 If Issues Occur

### Email Not Sending:
1. Check Hostinger error logs
2. Verify email account active
3. Test SMTP from webmail
4. Check spam folder

### Form Not Working:
1. Check browser console
2. Verify PHP file uploaded
3. Check file permissions
4. Review network requests

### 500 Error:
1. Check PHP error logs
2. Verify config file exists
3. Check PHP version (7.4+)
4. Verify file permissions

---

## 📱 Browser Testing

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Chrome
- [ ] Mobile Safari

---

## 🎉 Go Live!

Once all checks pass:
- [ ] Announce to team
- [ ] Monitor first few submissions
- [ ] Check email delivery
- [ ] Celebrate! 🎊

---

**Contact form is production-ready!**

Email: info@pisoninvestment.co.tz  
Website: https://pisoninvestment.co.tz
