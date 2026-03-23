<?php
namespace App\Middleware;

use App\Core\JWTHandler;
use App\Core\responseJson;

class AuthMiddleware{
  private function __construct(){}
  private function __clone(){}
  static function check(){
    $headers = getallheaders();
    $authorization = $headers["Authorization"];
    if(empty($authorization)){
      ResponseJson::responseJson( [
        "status"=>false,
        "message"=>"there is no token"
      ]);
    }
    $token = str_replace("Bearer ","",$authorization);
 
    $jwt = new JWTHandler();
    $res = $jwt->verifyToken($token);
    return $res->user;

  }
}


?>