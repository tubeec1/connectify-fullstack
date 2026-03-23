<?php 

namespace App\core;

use App\Core\responseJson;


class Router{
  private $routes = [];
  public function add(string $method, string $path, array $handler):void{
    $this->routes[$method][$path] = $handler;
  }

  public function dispatch(string $method, string $url):void{
    $url = parse_url($url, PHP_URL_PATH);
    $baseUrl = "/Fullstack-Layered-Social-API/backend/public";
    $url = str_replace($baseUrl, "", $url);
    
    foreach($this->routes[$method] ?? [] as $route=>$handler){
      $pattern = preg_replace("#\{id\}#", "(\d+)", $route);
      if(preg_match("#^$pattern$#", $url, $matches)){
       
        [$ControllerName, $action] = $handler;
        $controller = new $ControllerName();
        
        if(isset($matches[1])){
          $controller->$action($matches[1]);
          exit;
        }else{
          $controller->$action();  
          exit;    
        }
      }
    }
    
    ResponseJson::responseJson([
          "status"=>false,
          "message"=>"this api path is not exist!! check method and path"
        ]);

  }

}

?>