# Server Configuration Guide

## Issue: MIME Type Errors
If you see errors like "MIME type ('text/html') is not a supported stylesheet MIME type", your server is serving HTML instead of CSS/JS files.

## Solution 1: Updated .htaccess (Already Applied)
The .htaccess file has been updated to:
1. Force correct MIME types for assets
2. Exclude static assets from SPA routing
3. Only redirect HTML requests to index.html

## Solution 2: Alternative .htaccess for Different Servers

### For Shared Hosting (like Hostinger):
```apache
RewriteEngine On

# Force MIME types
AddType text/css .css
AddType application/javascript .js

# Don't rewrite files that exist
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Don't rewrite asset files
RewriteRule \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ - [L]

# Rewrite everything else to index.html
RewriteRule ^ /enterprise-shine-solutions/index.html [L]
```

### For Apache with Full Control:
```apache
<VirtualHost *:80>
    DocumentRoot /path/to/your/dist
    
    <Directory /path/to/your/dist>
        Options -Indexes
        AllowOverride All
        Require all granted
        
        # Handle SPA routing
        FallbackResource /index.html
    </Directory>
    
    # Correct MIME types
    <FilesMatch "\.(css)$">
        Header set Content-Type "text/css"
    </FilesMatch>
    
    <FilesMatch "\.(js)$">
        Header set Content-Type "application/javascript"
    </FilesMatch>
</VirtualHost>
```

## Solution 3: Nginx Configuration
If using Nginx:
```nginx
server {
    listen 80;
    server_name pisoninvestment.co.tz;
    root /path/to/dist;
    index index.html;

    # Handle static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Solution 4: Check File Upload
Make sure you uploaded the ENTIRE `dist` folder contents including:
- index.html
- assets/ folder with all CSS and JS files
- All image files
- .htaccess file

## Solution 5: Clear Server Cache
If using a hosting service:
1. Clear any server-side caching
2. Clear CDN cache if applicable
3. Wait 5-10 minutes for changes to propagate

## Solution 6: Verify File Paths
Check that these files exist on your server:
- `/enterprise-shine-solutions/assets/index-[hash].css`
- `/enterprise-shine-solutions/assets/index-[hash].js`
- `/enterprise-shine-solutions/index.html`

## Testing
After applying fixes, test these URLs directly:
- https://pisoninvestment.co.tz/enterprise-shine-solutions/
- https://pisoninvestment.co.tz/enterprise-shine-solutions/assets/index-[hash].css
- https://pisoninvestment.co.tz/enterprise-shine-solutions/assets/index-[hash].js

The CSS and JS files should return their actual content, not HTML.