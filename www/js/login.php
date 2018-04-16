<?php
header("Access-Control-Allow-Origin: *");
$mysql_host = "localhost";
$mysql_database = "gogoloca_gogo";
$mysql_user = "gogoloca_root";
$mysql_password = "TranceFamily19";
// Create connection
$conn = new mysqli($mysql_host, $mysql_user, $mysql_password,$mysql_database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


$userName = $_GET["userName"];
$password = $_GET["password"];

$sql = "SELECT UserName,Password FROM employee WHERE UserName =".$userName. " AND Password = ".$password;
$result = $conn->query($sql);
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
     $outp .= $rs["UserName"] . ',';
    $outp .=  $rs["Latitude"] . ',';
    $outp .=  $rs["Longitude"] . ',';
    $outp .=  $rs["Password"] ; 
       
}
$outp ='"records":'.$outp;
$conn->close();
echo($outp);
?>
