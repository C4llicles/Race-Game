<?php
require_once 'db_connect.php';
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Race Game</title>
    <link rel="stylesheet" href="game.css">
</head>
<body>
    <canvas id="Game" width="1280" height="640"></canvas>
    <div id="align-esc-button"><a href="index.php"><button>Esc</button></a></div>
    <div id="pausemenu">
        <div id="pausemenu-content">
            <h1>Pause</h1>
            <div id="pausemenu-buttons">
                <button id="resume" onclick="resume()">Resume</button>
                <button id="exit"><a href="index.php">Exit</a></button>
            </div>
        </div>
    </div>
</body>
<script src="game.js"></script>
</html>