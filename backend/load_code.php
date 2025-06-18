<?php
$projectDir = '../projects';
$name = $_GET['name'] ?? null;

if (!$name) {
    echo json_encode(['html' => '', 'css' => '', 'js' => '']);
    exit;
}

$filepath = "$projectDir/$name.json";
if (!file_exists($filepath)) {
    echo json_encode(['html' => '', 'css' => '', 'js' => '']);
    exit;
}

$data = json_decode(file_get_contents($filepath), true);
header('Content-Type: application/json');
echo json_encode($data);
