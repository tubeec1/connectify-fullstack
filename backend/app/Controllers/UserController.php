<?php

namespace App\Controllers;

use App\Core\responseJson;
use App\Services\UserService;

class UserController{
  private $userService;

  function __construct()
  {
    $this->userService = new UserService();
  }
  public function updateUser($id){
    $name = $_POST["name"] ?? null;
    $email = $_POST["email"] ?? null;
    $password = $_POST["password"] ?? null;
    $profileImage = $_FILES["profile_image"] ?? null;

    //validation
    if(empty($name) || empty($email) || empty($password) || empty($profileImage) || $profileImage["error"] == 4){
      return ResponseJson::responseJson([
        "status"=>false,
        "message"=>"fields of name, email, password, profile_image are required"
      ]);
    }

    var_dump($name,$email,$password,$id,$profileImage);
    
  }
}

?>