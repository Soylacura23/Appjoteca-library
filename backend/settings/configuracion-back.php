<?php
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../Database/conexion.php';

$sql = "SELECT * FROM usuarios WHERE id_usuario = ?"; 
$query = $connection->prepare($sql);
$query->bind_param("i", $mi_id); 
$query->execute();

$resultado = $query->get_result();
$usuario = $resultado->fetch_assoc();

if (!$usuario) {
    header("Location: ../../index.php");
    exit;
}

$foto_actual = !empty($usuario['foto_perfil']) ? $usuario['foto_perfil'] : '../../assets/images/default-avatar.png';
$documento = $usuario['documento'];
$foto_documento = $usuario['foto_documento'];
?>

