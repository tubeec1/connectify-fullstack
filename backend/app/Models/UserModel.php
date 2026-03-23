<?php

namespace App\Models;

use App\Config\DatabaseConfig;

class UserModel{
  private $conn;
  public function __construct()
  {
    $this->conn = DatabaseConfig::getConnection();
  }

  function updateUser($name, $email, $password, $profilePath,  $id){
    $stmt = $this->conn->prepare("update users set name=:name, email=:email, password=:password, profile_image:profile_image where id=:id");
    $stmt->execute([
      ":name"=>$name,
      ":email"=>$email,
      ":password"=>$password,
      ":profile_image"=>$profilePath,
      ":id"=>$id
    ]);
    return $stmt;
  }
}


?>