<?php
$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$file = __DIR__ . $path;

if (file_exists($file)) {
    return false;
} else {
    include 'not-found.html';
}
?>
