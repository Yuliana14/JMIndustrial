<?php

  class MySqlServerConnection
  {
    private $connection;
    private $user = 'root';
    private $password = '';

    function __construct()
    {
      try {
        $this->connection = new PDO('mysql:host=localhost;dbname=Directorio;charset=utf8', $this->user, $this->password);
      } catch (PDOException $e) {
        echo "Error ".$e->getMessage();
      }
    }

    public function executeQuery($sql, $params)
    {
      $stmt = $this->connection->prepare($sql);
      if ($stmt === false) {
        echo "Error in Query ".$sql;
        die();
      }
      $stmt->execute($params);
      $data = $stmt->fetchAll();
      return $data;
    }

    function db_fetch_all($sql, $params, $use_cache = true) {
      $memcache = new Memcache();
      $memcache->pconnect('127.0.0.1', 24621);
      global $cache_expiration;

      $result = false;
      if ($use_cache) {
        // Generate a key for the cache
        $cache_key = md5($sql . serialize($params));
        $result = $memcache->get($cache_key);
      }

      if (!$result) {
        // Cache Miss: Prepare the sql and recache it
        $sth = $this->connection->prepare($sql);

        $sth->execute($params);
        $result = $sth->fetchAll(); // Fetch the entire result into an array
        
        // Cache expires in 10 seconds
        $cache_key = md5($sql . serialize($params));
        $cache_expiration = 10;
        $memcache->set($cache_key, serialize($result), MEMCACHE_COMPRESSED, $cache_expiration);

        echo "used mysql";
      } else {
        // Cache Hit
        echo "used memcache";
      }

      return $result;
    }

    public function executeNonQuery($sql, $params)
    {
      $stmt = $this->connection->prepare($sql);
      if ($stmt === false) {
        echo "Error in Query ".$sql;
        die();
      }
      $stmt->execute($params);
      $id = $this->connection->lastInsertId();
      return $id;
    }

    public function executeNonQueryWithReturn($sql, $params)
    {
      $stmt = $this->connection->prepare($sql);
      if ($stmt === false) {
        echo "Error in Query ".$sql;
        die();
      }
      $status = $stmt->execute($params);

      return $status;
    }

    public function executeScript($sql)
    {
      $stmt =$this->connection->exec($sql);
      if ($stmt === false) {
        echo "Error in Query ".$sql;
        die();
      }
    }

    public function close()
    {
      $this->connection = null;
    }
  }
?>

