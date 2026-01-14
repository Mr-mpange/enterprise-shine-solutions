<?php
// PHPMailer Installation Script
// Run this once to download PHPMailer

echo "<h1>PHPMailer Installation</h1>";

$phpmailer_url = "https://github.com/PHPMailer/PHPMailer/archive/refs/tags/v6.9.1.zip";
$zip_file = "phpmailer.zip";
$extract_to = "PHPMailer";

// Download PHPMailer
echo "Downloading PHPMailer...<br>";
$zip_content = file_get_contents($phpmailer_url);
if ($zip_content === false) {
    die("❌ Failed to download PHPMailer");
}

file_put_contents($zip_file, $zip_content);
echo "✅ Downloaded<br>";

// Extract
echo "Extracting...<br>";
$zip = new ZipArchive;
if ($zip->open($zip_file) === TRUE) {
    $zip->extractTo('.');
    $zip->close();
    
    // Move files to PHPMailer folder
    if (is_dir('PHPMailer-6.9.1')) {
        rename('PHPMailer-6.9.1/src', 'PHPMailer');
        
        // Clean up
        unlink($zip_file);
        rmdir('PHPMailer-6.9.1');
        
        echo "✅ PHPMailer installed successfully!<br>";
        echo "<br><strong>Next steps:</strong><br>";
        echo "1. Delete this file (install-phpmailer.php)<br>";
        echo "2. Rename contact-handler.php to contact-handler-old.php<br>";
        echo "3. Rename contact-handler-smtp.php to contact-handler.php<br>";
        echo "4. Test your contact form<br>";
    } else {
        echo "❌ Extraction failed";
    }
} else {
    echo "❌ Failed to extract ZIP file";
}
?>
