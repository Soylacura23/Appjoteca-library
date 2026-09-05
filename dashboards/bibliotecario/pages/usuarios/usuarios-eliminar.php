<?php
// Mismos requires (y misma profundidad de ruta) que usuarios.php, para que
// esta acción quede protegida por la misma sesión/rol que la página que la usa.
require_once __DIR__ . '/../../backend/config/auth.php';
require_once __DIR__ . '/../../backend/Database/conexion.php';

header('Content-Type: application/json; charset=utf-8');

// Solo Bibliotecario (rol 3) puede eliminar usuarios, igual que en usuarios.php.
// auth.php ya llamó session_start() y valida que exista sesión activa;
// requiereRol() corta la ejecución con 403 si el rol no coincide.
requiereRol([3]);

$id_usuario = filter_input(INPUT_POST, 'id_usuario', FILTER_VALIDATE_INT);

if (!$id_usuario) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'id_usuario inválido']);
    exit();
}

if ($id_usuario === (int) $_SESSION['usuario_id']) {
    http_response_code(409);
    echo json_encode(['ok' => false, 'error' => 'No puedes eliminar tu propia cuenta']);
    exit();
}

$stmt = $connection->prepare('DELETE FROM usuarios WHERE id_usuario = ?');
$stmt->bind_param('i', $id_usuario);
$exito = $stmt->execute();

if ($exito && $stmt->affected_rows > 0) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(404);
    echo json_encode(['ok' => false, 'error' => 'Usuario no encontrado o no se pudo eliminar']);
}

$stmt->close();
$connection->close();