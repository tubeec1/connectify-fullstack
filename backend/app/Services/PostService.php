<?php
namespace App\Services;
use App\Models\PostModel;

class PostService{
  private $postModel;
  function __construct()
  {
    $this->postModel = new PostModel();
  }

  public function createPost($userId, $content, $files){
    $postId = $this->postModel->createPost($userId, $content);
    if(empty($postId)){
      return [
        "status"=>false,
        "message"=>"there is not postId created"
      ];
    }
   

    for($i=0; $i<count($files["name"]); $i++){
      $filename = time().$files["name"][$i];
      $destination = __DIR__."/../../public/postFiles/".$filename;
      if(!move_uploaded_file($files["tmp_name"][$i], $destination)){
        return [
          "status"=>false,
          "message"=>"not uploaded this fiel name: $filename"
        ];
      }

      $filePath = "postFiles/".$filename;
      $this->postModel->createPostMedia($postId, $filePath, $files["type"][$i]);
    }

    return [
      "status"=>true,
      "message"=>"successfully created this post"
    ];

  }

  function getPosts(){
    $res = $this->postModel->getPosts();
    return [
      "status"=>true,
      "message"=>"all posts are here",
      "posts"=>$res
    ];
  }

  function deletePost($id){
    $res = $this->postModel->deletePost($id);
    if($res){
      return [
        "status"=>true,
        "message"=>"successfully deleted this post"
      ];
    }else{
      return[
         "status"=>false,
        "message"=>"sorry this post not deleted"
      ];
    }
  }

}
?>