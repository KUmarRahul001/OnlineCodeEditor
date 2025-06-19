<?php
session_start();
echo isset($_SESSION['email']) ? 'logged_in' : 'not_logged_in';
