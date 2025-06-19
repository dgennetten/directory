<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();
header('Content-Type: application/json');

// List of allowed emails (export from your familyData)
$allowed_emails = [
  'dongennetten@yahoo.com',
  'donaldjg78@yahoo.com',
  'douglas@gennetten.com',
  'dianeordway@gennetten.com',
  'jonbrauer2@gmail.com',
  'jajoice@yahoo.com',
  'jodijoice@rocketmail.com',
  'angberda@gmail.com',
  'darren@gennetten.com',
  'landon@gennetten.com',
  'evan@gennetten.org',
  'noah@gennetten.com',
  'isabella@gennetten.com',
  'kelley.atlas@gmail.com',
  'landon.atlas@protonmail.com'
];

$data = json_decode(file_get_contents('php://input'), true);
$email = trim(strtolower($data['email'] ?? ''));

if (!$email) {
    echo json_encode(['success' => false, 'message' => 'No email provided.']);
    exit;
}

if (!in_array($email, $allowed_emails)) {
    echo json_encode(['success' => false, 'message' => 'Email not recognized.']);
    exit;
}

$code = rand(100000, 999999);
$_SESSION['2fa'][$email] = $code;

// Send email
$subject = 'Your Family Directory Login Code';
$message = "Your login code is: $code";
$headers = "From: support@directory.gennetten.org\r\n" .
           "Reply-To: support@directory.gennetten.org\r\n" .
           "X-Mailer: PHP/" . phpversion();

if (mail($email, $subject, $message, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send email.']);
}
exit;
?>