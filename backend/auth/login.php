<?php
session_start();
require '../db.php';

if (!isset($_POST['email'], $_POST['password'])) {
    exit('Missing email or password');
}

$email = trim($_POST['email']);
$password = trim($_POST['password']);

$stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    exit("❌ Email not found");
}

$stmt->bind_result($hashed);
$stmt->fetch();

if (!password_verify($password, $hashed)) {
    exit("❌ Incorrect password");
}

$_SESSION['email'] = $email;
echo "✅ Login successful";

$stmt->close();
$conn->close();
