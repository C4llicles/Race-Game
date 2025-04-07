<?php
$servername = 'localhost';
$dbname = 'racegame';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo ("Erreur de connexion : " . $e->getMessage());
    http_response_code(500);
    die("Database connection failed: " . $e->getMessage());
}


?>