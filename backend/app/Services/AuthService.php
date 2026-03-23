<?php
namespace App\Services;
use App\Models\AuthModel;
use App\Core\ResponseJson;
use App\Core\JWTHandler;


class AuthService{
  private $authModel; 
  public function __construct(){
    $this->authModel = new AuthModel();
  }

  // signup function is below
  function createUSer($data){
   
    $user = $this->authModel->findByEmail($data["email"]);
    if($user){
      return [
        "status"=>false,
        "message"=>"This user already exist"
      ];
    }

    $hashedPassowrd = password_hash($data["password"], PASSWORD_DEFAULT);
    
    if(isset($data["image"]) && $data["image"]["error"] == 0){
     $filename = time().$data["image"]["name"];
     $destination = __DIR__ . "/../../public/profileImages/".$filename;
     if(!move_uploaded_file($data["image"]["tmp_name"], $destination)){
      return [
        "status"=>false,
        "message"=>"not uploaded this file"
      ];
   
     }
     $imagePath = "profileImages/".$filename;

     $user = [
      "name"=>$data["name"],
      "email"=>$data["email"],
      "password"=>$hashedPassowrd,
      "profile_image"=>$imagePath
     ];
     
     $this->authModel->create($user); 
     return [
      "status"=>true,
      "message"=>"successfully registered this user"
     ];
    }
  }

  //login function is below
  public function login($email, $password){
    $user = $this->authModel->findByEmail($email);
    if(!$user){
     return [
        "status"=>false,
        "message"=>"this user is not exist"
      ];
    }
    
   if(!password_verify($password, $user["password"])){
    return[
        "status"=>false,
        "message"=>"Password is incorrect"
      ];
   }
  
   $jwt = new JWTHandler();
  
   $t = $jwt->generateToken($user["id"], $user["name"], $user["email"]);
   return [
    "status"=>true,
    "message"=>"successfully logged in",
    "token"=>$t,
    "user"=>[
      "id"=>$user["id"],
      "name"=>$user["name"],
      "email"=>$user["email"],
      "profile_image"=>$user["profile_image"],
    ]
   ];
  }

  //profile function is below 
  public function profile(){
    $headers = getallheaders();
    $authorization = $headers["Authorization"];
    
    $token = str_replace("Bearer ","",$authorization);
    if(empty($token)){
      return [
        "status"=>false,
        "message"=>"There is no token"
      ];
    }

    $jwt = new JWTHandler();
    $decode = $jwt->verifyToken($token);
    return [
      "status"=>true,
      "message"=>"user is here",
      "user"=>$decode->user
    ]; 
  }
}


?>