<?php
session_start();
require '../db.php';

if (!isset($_POST['email'], $_POST['phone'], $_POST['password'])) {
    exit('Missing fields');
}

$email = trim($_POST['email']);
$phone = trim($_POST['phone']);
$password = trim($_POST['password']);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit('Invalid email format');
}
if (strlen($password) < 4) {
    exit('Password must be at least 4 characters');
}

// Check if email exists
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    exit("⚠️ Email already registered");
}
$stmt->close();

// Insert new user
$hashed = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO users (email, phone, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $email, $phone, $hashed);
if ($stmt->execute()) {
    $_SESSION['email'] = $email;
    echo "✅ Registration successful";
} else {
    echo "❌ Registration failed";
}
$stmt->close();
$conn->close();
