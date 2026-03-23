<?php
namespace App\Config;

use Exception;
use PDO;
class DatabaseConfig{
  private static ?PDO $connection = null;
  private function __construct(){}
  private function __clone(){}
  public static function getConnection(){
    $dsn= "mysql:host=".$_ENV["DB_HOST"].";dbname=".$_ENV["DB_NAME"].";charset=utf8mb4";
    $user = $_ENV["DB_USER"];
    $password = $_ENV["DB_PASS"];
    if(self::$connection == null){
       try{
        self::$connection = new PDO($dsn, $user, $password);
        self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return self::$connection;
      }catch(Exception $e){
        die("not connected to database because of: ".$e->getMessage());
      }
    }
    return self::$connection;
  }
 
}

?>