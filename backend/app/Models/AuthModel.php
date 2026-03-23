<?php 
namespace App\Models;
use App\config\DatabaseConfig;

use PDO;
class AuthModel{
  private $db;

  public function __construct()
  {
    $this->db = DatabaseConfig::getConnection();
  }

  function create($user){
    $stmt = $this->db->prepare("insert into users(name,email,password,profile_image) values(:name, :email, :password, :profile_image)");
    return $stmt->execute([
      ":name"=>$user["name"],
      ":email"=>$user["email"],
      ":password"=>$user["password"],
      ":profile_image"=>$user["profile_image"]
    ]);
  }

  function findByEmail($email){
    $stmt = $this->db->prepare("select * from users where email=:email");
    $stmt->execute([":email"=>$email]);
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
    return $data;
  }

 
}

?>