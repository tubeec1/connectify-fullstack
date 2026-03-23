<?php
namespace App\Core;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTHandler{
  private $secret_key;
  private $expire;
  public function __construct(){
    $this->secret_key = $_ENV["JWT_SECRET"];
    $this->expire = $_ENV["JWT_EXPIRE"];
  }
  public function generateToken($id,$name, $email){
    $payload = [
      "iat"=>time(),
      "exp"=>time()+$this->expire,
      "user"=>[
        "id"=>$id,
        "name"=>$name,
        "email"=>$email
      ]
    ];
    $token = JWT::encode($payload, $this->secret_key, "HS256");
    return $token;
  }

  public function verifyToken($t){
    return JWT::decode($t, new Key($this->secret_key, "HS256"));
  }
}

?>