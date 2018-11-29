<?php
//this lines hel up to show if there are errors
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


// include file connection
require_once('connection.php');

//create object connection
$connection = new MySqlServerConnection();

//create switch case for all process (add, edit, read and delete)

if (!empty($_POST['IDCASE'])) {
  // variable that indicate what case entry
  $case = $_POST['IDCASE'];
  switch ($case) {
    // this case help us to add new company
    case '1':
      //this condition help us to verify that recieves mainly data
      if (isset($_POST['NAME']) && isset($_POST['ADDRESS']) && isset($_POST['PHONE'])) {
        #pass data recieves from form data on html code to variables
        $name = $_POST['NAME'];
        $address = $_POST['ADDRESS'];
        $phone = $_POST['PHONE'];
        $arrayContact = json_decode($_POST['CONTACTS']) ;


        #create query that help us to insert values on BD
        #on this query put column names of BD and put (?) like parameters on wait
        $sqlInsert = "INSERT INTO companies(name, address, phone) VALUES (?,?,?)";

        #execute before query, invocating the connection object and pass result to variable
        #the $result variable returns the last id that was inserted on our BD
        #the function "executeNonQuery" help us to insert data, the parameters that recieves are:
        #1. the variable that contains the sentences mysql or query ($sqlInsert)
        #2. an Array that contains the values to insert, in this case name, address, phone and contact name of company
        $result = $connection->executeNonQuery($sqlInsert,array($name,$address,$phone));

        #check if data company was inserted, if was inserted continue with contacts data insert
        if ($result > 0) {
          #counter for knows how many contacts were inserted
          $count = 0;
          # read array with data contact one by one and insert on table
          foreach ($arrayContact as $key) {
            #declare object for array and gets values
            $key = (Object)$key;
            #build query insert
            $sqlContact = "INSERT INTO contacts(name, email,phone, company) VALUES (?,?,?,?)";
            #execute query insert
            $resultContact = $connection->executeNonQuery($sqlContact,array($key->nameContact,$key->mailContact,$key->phoneContact,$result));
            #check if result major to 0, because the function returns the last id that was inserted
            if ($resultContact > 0) {
              #foreach insert on DB or id returns, add 1 to counter
              $count ++;
            }
          }
          echo $result;
          
        } else {
          echo "2";
        }
        
        
      } else {
        echo "3";
      }
      
    break;

    //this case gets all companies for display on table 
    case '2':
      #build the query
      $sql = "SELECT ndx,name,address,phone,contactName FROM companies";
      #execute query and pass result into variable
      $result = $connection->executeQuery($sql,array());

      #read all results with foreach
      $array_company = array(); 
      $i = 0;

      foreach ($result as $row)
      {
          $row = (Object)$row;
          $array_company [$i]["id"]= $row->ndx;
          $array_company [$i]["name"]= $row->name;
          $array_company [$i]["address"]= $row->address;
          $array_company [$i]["phone"]= $row->phone;
          $i++;
      }

      $results = array("data"=>$array_company);
      
      echo json_encode($results);

    break;

    //this case add call to company
    case '3':
      #declare variables that will are posted
      $date = $_POST['DATECALL'];
      $comment = $_POST['COMMENT'];
      $status = $_POST['STATUS'];
      $fkCompany = $_POST['COMPANY'];

      #buil query
      $addCall = "INSERT INTO calls(dateCall,commentCall,status, fkCompany) VALUES (?,?,?,?)";
      #execute query and pass result to variable
      $result = $connection->executeNonQuery($addCall,array($date,$comment,$status,$fkCompany));
      if ($result > 0) {
        echo "1";
      }else {
        echo "2";
      }
    break;

    case '4':
      if (!empty($_POST['FKCOMP'])) {
        $fkCompany = $_POST['FKCOMP'];
        $sql = "SELECT dateCall,commentCall,status,name FROM calls 
                JOIN companies ON fkCompany = ndx
                WHERE fkCompany = ? ORDER BY dateCall DESC";
        $result = $connection->executeQuery($sql,array($fkCompany));

        #read all results with foreach
        $array_comments = array(); 
        $i = 0;

        foreach ($result as $key) {
          $key = (Object)$key;
          $array_comments [$i]["dateCall"]= $key->dateCall;
          $array_comments [$i]["commentCall"]= $key->commentCall;
          $array_comments [$i]["statusCall"]= $key->status;
          $array_comments [$i]["nameCompany"]= $key->name;
          $i++;
        }

        $results = array("data"=>$array_comments);
      
        echo json_encode($results);

      }else{
        echo "2";
      }

    break;
    
    default:
      # code...
      break;
  }
} else {
  echo "Entry ID Case";
}



?>
