<?php
$projectDir = '../projects';
if (!file_exists($projectDir)) mkdir($projectDir, 0777, true);

$files = scandir($projectDir);
$projects = [];

foreach ($files as $file) {
    if (pathinfo($file, PATHINFO_EXTENSION) === 'json') {
        $projects[] = basename($file, '.json');
    }
}

header('Content-Type: application/json');
echo json_encode($projects);
