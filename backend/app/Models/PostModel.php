<?php 
namespace App\Models;

use App\Config\DatabaseConfig;
use Exception;
use PDO;
use PDOException;

class PostModel{
  private $con;
  function __construct()
  {
    $this->con = DatabaseConfig::getConnection();
  }

  function createPost($userId, $content){
    $stmt = $this->con->prepare("insert into posts(user_id, content) values(:user_id, :content)");
    $stmt->execute([
      ":user_id"=>$userId,
      ":content"=>$content
    ]);
    return $this->con->lastInsertId();
  }

  function createPostMedia($postId, $filePath, $fileType){
    $stmt = $this->con->prepare("
      INSERT INTO post_media (post_id, file_path, file_type)
      VALUES (:post_id, :file_path, :file_type);");
    
    $stmt->execute([
      ":post_id"=>$postId,
      ":file_path"=>$filePath,
      ":file_type"=>$fileType
    ]);
  }

  function getPosts(){

  $stmt = $this->con->prepare("
   SELECT 
    posts.id,
    posts.content,
    posts.user_id,
    posts.created_at,
    users.name,
    users.profile_image,
    post_media.file_path,
    post_media.file_type
    FROM posts
    LEFT JOIN users 
        ON posts.user_id = users.id
    LEFT JOIN post_media 
        ON posts.id = post_media.post_id
    ORDER BY posts.id DESC;
  ");

  $stmt->execute();
  $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);


  $posts = [];
  foreach($rows as $row){
 
    $postId = $row["id"];
    if(!isset($posts[$postId])){
      $posts[$postId] = [
        "id"=>$postId,
        "content"=>$row["content"],
        "created_at"=>$row["created_at"],
         "userId"=>$row["user_id"],
        "userName"=>$row["name"],
        "userProfileImage"=>$row["profile_image"],
        "media"=>[]  
      ];
    }

    if($row["file_path"]){
      $posts[$postId]["media"][] = [
        "file_path"=>$row["file_path"],
        "file_type"=>$row["file_type"]
      ];
    }
  }

  return $posts;
}

function deletePost($postId){
  $this->con->beginTransaction();

  try{
    $query1 = "delete from post_media where post_id=:post_id";
    $query2 = "delete from posts where id=:post_id";

    $stmt1 = $this->con->prepare($query1);
    $stmt1->execute([
      ":post_id"=>$postId
    ]);

    $stmt2 = $this->con->prepare($query2);
    $stmt2->execute([
      ":post_id"=>$postId
    ]);

    $this->con->commit();
    return true;
  }catch(Exception $e){
    $this->con->rollBack();
    return false;
  }

}
}



?>