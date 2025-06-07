<?php
session_start();
require_once '../db/db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $email = trim($_POST['email']);
  $password = $_POST['password'];

  if (empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Email and password are required."]);
    exit;
  }

  $stmt = $conn->prepare("SELECT id, name, password FROM users WHERE email = ?");
  $stmt->bind_param("s", $email);
  $stmt->execute();
  $stmt->store_result();

  if ($stmt->num_rows == 1) {
    $stmt->bind_result($id, $name, $hashedPassword);
    $stmt->fetch();

    if (password_verify($password, $hashedPassword)) {
      $_SESSION['user_id'] = $id;
      $_SESSION['name'] = $name;

      echo json_encode(["success" => true, "message" => "Login successful."]);
    } else {
      echo json_encode(["success" => false, "message" => "Invalid password."]);
    }
  } else {
    echo json_encode(["success" => false, "message" => "Email not found."]);
  }
}
?>
