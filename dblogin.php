<?php
/**
 * Created by PhpStorm.
 * User: Ross
 * Date: 17/02/2015
 * Time: 23:15
 */
$servername = "localhost";
$username = "buildax";
$password = "Skinks94";
$table = "buildax";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
