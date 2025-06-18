<?php
session_start();
$usersFile = "../users.json";

$users = file_exists($usersFile) ? json_decode(file_get_contents($usersFile), true) : [];

$email = $_POST["email"] ?? "";
$password = $_POST["password"] ?? "";

if (!$email || !$password) {
    echo "? Email and password required.";
    exit;
}

if (!isset($users[$email]) || !password_verify($password, $users[$email]["password"])) {
    echo " Invalid credentials.";
    exit;
}

$_SESSION["user"] = $email;
echo " Login successful";
