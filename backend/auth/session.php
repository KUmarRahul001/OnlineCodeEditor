<?php
session_start();
echo isset($_SESSION["user"]) ? "logged_in" : "not_logged_in";
