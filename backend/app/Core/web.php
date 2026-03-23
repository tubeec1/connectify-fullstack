<?php

use App\Controllers\AuthController;
use App\Controllers\PostController;
use App\Controllers\UserController;

$router->add("POST", "/api/signup", [AuthController::class, "store"]);
$router->add("POST", "/api/login", [AuthController::class, "login"]);
$router->add("POST", "/api/users/update/{id}", [UserController::class, "updateUser"]);
$router->add("GET", "/api/profile", [AuthController::class, "profile"]);
$router->add("POST", "/api/posts/create", [PostController::class, "store"]);
$router->add("GET", "/api/posts", [PostController::class, "index"]);
$router->add("DELETE", "/api/posts/delete/{id}", [PostController::class, "deletePost"])

?>