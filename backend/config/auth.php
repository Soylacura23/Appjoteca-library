<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['usuario_id'])) {
    header("Location: ../../auth/login/login.php");
    exit();
}

$mi_rol_num = $_SESSION['rol'];

function requiereRol(array $roles) {
    global $mi_rol_num;
    if (!in_array($mi_rol_num, $roles)) {
        http_response_code(403);
        require __DIR__ . '/../../errors/403.php';
        exit();
    }
}
?>