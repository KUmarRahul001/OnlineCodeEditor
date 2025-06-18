<?php
$projectDir = '../projects';
$name = $_POST['name'] ?? null;

if (!$name) {
    echo "❌ Project name is required.";
    exit;
}

$filepath = "$projectDir/$name.json";
if (file_exists($filepath)) {
    unlink($filepath);
    echo "🗑️ Project '$name' deleted.";
} else {
    echo "❌ Project not found.";
}
