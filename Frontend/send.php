<?php

require_once 'db_connect.php';
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    http_response_code(405); // Method Not Allowed
    die("Method not allowed");
}
$stmt = $conn->prepare("INSERT INTO score (name, temps) VALUES (:name, :temps)");
$stmt->bindParam(':name', $_POST['name']);
$stmt->bindParam(':temps', $_POST['temps']);
error_log($_POST['temps']);
try {
    $stmt->execute();
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    die("Database error: " . $e->getMessage());
}

?>