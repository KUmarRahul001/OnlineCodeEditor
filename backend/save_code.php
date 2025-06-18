<?php
$projectDir = '../projects';
if (!file_exists($projectDir)) mkdir($projectDir, 0777, true);

$name = $_POST['name'] ?? null;
$html = $_POST['html'] ?? '';
$css = $_POST['css'] ?? '';
$js = $_POST['js'] ?? '';

if (!$name) {
    echo "❌ Project name is required.";
    exit;
}

$data = json_encode(['html' => $html, 'css' => $css, 'js' => $js], JSON_PRETTY_PRINT);
file_put_contents("$projectDir/$name.json", $data);

echo "✅ Project '$name' saved successfully.";
