<?php
namespace App\Controllers;

use App\Core\ResponseJson;
use App\Services\AuthService;
use App\Services\PostService;

use function PHPSTORM_META\type;

class AuthController{
  private $authService;

  public function __construct()
  {
    $this->authService = new AuthService;
  }
  public function store(){
  
    //getting data from form
    $name = $_POST["name"] ?? null;
    $email = $_POST["email"] ?? null;
    $password = $_POST["password"] ?? null;
    $image = $_FILES["profile_image"];

    if(empty($name) || empty($email) || empty($password) || !$image || $image["error"]== 4){
     ResponseJson::responseJson([
      "status"=>false,
      "message"=>"all fileds are required"
     ],422);
     exit;
    }

    $data = [
      "name" => $name,
      "email"=>$email, 
      "password"=>$password,
      "image"=>$image
    ];
    $res = $this->authService->createUSer($data);
    if(!$res["status"]){
       return ResponseJson::responseJson($res, 401);
    }
    
    return ResponseJson::responseJson($res, 201);
    


  }

  public function login(){
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data["email"] ?? null;
    $password = $data["password"] ?? null;
    if(empty($email) || empty($password)){
      ResponseJson::responseJson([
        "status"=>false,
        "message"=>"Email and Password fields are required"
      ], 422);
    }
    $res = $this->authService->login($email, $password);
    if(!$res["status"]){
      return ResponseJson::responseJson($res, 401);
    }
    return ResponseJson::responseJson($res, 200);
  }

  public function profile(){
    $res = $this->authService->profile();
    if(!$res["status"]){
      return ResponseJson::responseJson($res, 401);
    }
    return ResponseJson::responseJson($res, 200);
  }

  
}

?>