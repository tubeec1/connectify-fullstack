<?php
namespace App\Core;

class responseJson{
  private function __construct(){}
  private function __clone(){}
  public static function responseJson($data,$status=200){
    http_response_code($status);
    header("Content-Type","application/json");
    echo json_encode($data);
  }
  
}

?>