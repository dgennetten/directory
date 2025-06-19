<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$email = trim(strtolower($data['email'] ?? ''));
$code = trim($data['code'] ?? '');

if (isset($_SESSION['2fa'][$email]) && $_SESSION['2fa'][$email] == $code) {
    unset($_SESSION['2fa'][$email]); // One-time use
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid code.']);
}
?>