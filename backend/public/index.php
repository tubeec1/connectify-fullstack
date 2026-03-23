<?php

require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;
use App\Core\Router;

// =======================
// 1️⃣ Load Environment
// =======================

$dotenv = Dotenv::createImmutable(__DIR__ . "/../");
$dotenv->load();

// =======================
// 2️⃣ CORS
// =======================

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// =======================
// 3️⃣ Router
// =======================

$router = new Router();

require __DIR__ . '/../app/Core/web.php';

$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);