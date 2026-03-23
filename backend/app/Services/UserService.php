<?php
namespace App\Services;

use App\Models\AuthModel;
use App\Models\UserModel;

class UserService{
  private $authModel;
  private $userModel;

  public function __construct()
  {
    $this->authModel = new AuthModel();
    $this->userModel = new UserModel();
  }

  public function updateUser($id, $name, $email, $password, $profileImage){
    
  }
}

?>