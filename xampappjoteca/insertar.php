<?php

include("conexion.php");
$nombre=$_POST["nombre"];
$usuario=$_POST["usuario"];
$email=$_POST["email"];
$cedula=$_POST["cedula"];
$password=$_POST["contrasena"];





mysqli_query($con,"insert into registro (nombreyapellidos,nombredeusuario,correo,documento,password)values('".$nombre."','".$usuario."','".$email."','".$cedula."','".$password."')");

?>