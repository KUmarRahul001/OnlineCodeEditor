<?php
session_start();
$usersFile = "../users.json";

$users = file_exists($usersFile) ? json_decode(file_get_contents($usersFile), true) : [];

$email = $_POST["email"] ?? "";
$phone = $_POST["phone"] ?? "";
$password = $_POST["password"] ?? "";

if (!$email || !$phone || !$password) {
    echo "? All fields required.";
    exit;
}

if (isset($users[$email])) {
    echo " Email already registered.";
    exit;
}

$users[$email] = [
    "email" => $email,
    "phone" => $phone,
    "password" => password_hash($password, PASSWORD_BCRYPT)
];

file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));
echo " Registered successfully.";
