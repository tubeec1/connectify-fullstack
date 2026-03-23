<?php 
namespace App\Controllers;

use App\Core\responseJson;
use App\Middleware\AuthMiddleware;
use App\Services\PostService;

class PostController{
  private $postService;
  function __construct()
  {
    $this->postService = new PostService();
  }

  public function store(){
    // check user its token if valid
    $user = AuthMiddleware::check();

    $userId = $user->id;
    $content = $_POST["content"] ?? null;
    $files = $_FILES["files"] ?? null;

    if(empty($userId) || empty($content) || !$files || $files["error"]==4){
      ResponseJson::responseJson([
        "status"=>false,
        "message"=> "all fields are required"
      ],422);
    }

    $res = $this->postService->createPost($userId, $content, $files);
   
    if($res["status"]){
      ResponseJson::responseJson($res, 201);
    }else{
      ResponseJson::responseJson($res, 400);
    }
    
  }
  public function index(){
    $res = $this->postService->getPosts();
    if($res["status"]){
      ResponseJson::responseJson($res, 200);
    }else{
      ResponseJson::responseJson($res, 400);
    }
  }

  public function deletePost($id){
    $user = AuthMiddleware::check();
  

    if(!$user){
      return  ResponseJson::responseJson([
        "status"=>false,
        "message"=>"this is unauthorized"
      ],401);
    }
    $res = $this->postService->deletePost($id);
    ResponseJson::responseJson($res,200);
  }
 
}


?>