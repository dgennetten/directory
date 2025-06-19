<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$to = 'douglas@gennetten.com';
$subject = 'Test Email from DreamHost';
$message = 'This is a test.';
$headers = "From: support@directory.gennetten.org\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo 'Mail sent!';
} else {
    echo 'Mail failed!';
}
?>