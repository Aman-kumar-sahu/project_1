<?php
if (isset($_GET["name"])){
  $var=$_GET["name"];
}
else{
$var=array("aman","ram","shayam","lakhan");
}
$var1="<html>
<head></head>
<body><h1>Hello world</h1><br><form action='http://localhost/lessons/index.php' method='get'><input type='text' name='name'>
</input><br><input type='submit' value='Submit'></form>
</body>
</html>";
array_push($var,"krishna");
array_pop($var);
foreach($var as $index){
  echo $index;
  echo "<br>";
}
print_r($var);
echo $var1;
 ?>
