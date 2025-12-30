# Email Setup Guide - Avoid Spam Folder

## 1. DNS Records Setup (CRITICAL for inbox delivery)

Add these DNS records to your domain `pisoninvestment.co.tz`:

### SPF Record (TXT)
```
Name: @
Value: v=spf1 include:_spf.hostinger.com ~all
```

### DKIM Record (TXT)
Contact your hosting provider (Hostinger) to get your DKIM key and add it.

### DMARC Record (TXT)
```
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:info@pisoninvestment.co.tz
```

## 2. Email Account Setup

Create these email accounts in your hosting panel:
- `info@pisoninvestment.co.tz` (main contact email)
- `noreply@pisoninvestment.co.tz` (for automated emails)

## 3. Hosting Configuration

### For Hostinger:
1. Go to Hostinger Panel → Email
2. Create the email accounts above
3. Enable "Email Authentication" if available
4. Set up email forwarding if needed

## 4. Email Content Best Practices (Already Implemented)

✅ Professional HTML templates
✅ Proper email headers
✅ Clear sender identification
✅ Unsubscribe information
✅ Company contact details
✅ Proper MIME types

## 5. Testing Email Delivery

Use these tools to test your email setup:
- https://www.mail-tester.com/
- https://mxtoolbox.com/spf.aspx
- https://dmarcian.com/dmarc-inspector/

## 6. Additional Recommendations

1. **Warm up your domain**: Send a few test emails first
2. **Monitor bounce rates**: Keep them under 5%
3. **Use consistent sender name**: Always "Pison Investment Limited"
4. **Avoid spam trigger words**: Already avoided in templates
5. **Include physical address**: Add to email footer if required

## 7. If Emails Still Go to Spam

1. Ask recipients to add `info@pisoninvestment.co.tz` to their contacts
2. Request they check spam folder initially and mark as "Not Spam"
3. Consider using a transactional email service like:
   - SendGrid
   - Mailgun
   - Amazon SES

## 8. Monitoring

Check these regularly:
- Email delivery rates
- Spam complaints
- DNS record status
- Email account quotas