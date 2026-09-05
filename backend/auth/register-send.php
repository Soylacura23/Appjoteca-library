<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require("../Database/conexion.php");

header('Content-Type: application/json');

$rol_recibido = $_POST['rol'] ?? '';

$tabla_roles = [
    'estudiante' => 1,
    'profesor'   => 2  
];

if (!array_key_exists($rol_recibido, $tabla_roles)) {
    echo json_encode(['status' => 'error', 'message' => 'El rol seleccionado no es válido.']);
    exit;
}

$id_rol = $tabla_roles[$rol_recibido];



    // 2. CAPTURAR LA FECHA Y HORA ACTUAL DEL SERVIDOR
    // Formato estándar para bases de datos (Año-Mes-Día Horas:Minutos:Segundos)
    


    if($_SERVER["REQUEST_METHOD"]==="POST"){
        $nombre = $_POST["nombre"];
        $usuario = $_POST["usuario"];
        $correo = $_POST["email"];
        $documento = $_POST["cedula"];
        $contrasena_plana = $_POST["contrasena"];

       
        $contrasena_encriptada = password_hash($contrasena_plana, PASSWORD_BCRYPT);

        date_default_timezone_set('America/Bogota'); // Ajusta a tu zona horaria si es necesario
        $fecha_creacion = date("Y-m-d");
        

        $sql = "INSERT INTO usuarios (id_rol, nombre_apellido, nombre_usuario, correo_institucional, documento, password, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?)";

        $query = $connection->prepare($sql);

        $query->bind_param(
            "issssss",
            $id_rol, 
            $nombre,
            $usuario,
            $correo,
            $documento,
            $contrasena_encriptada,
            $fecha_creacion
        );

        if ($query->execute()) {
        echo json_encode([
            'status' => 'success', 
            'message' => "El usuario " . $nombre . " ha sido registrado con éxito"
        ]);
    } else {
        echo json_encode([
            'status' => 'error', 
            'message' => "Hubo un error al registrar al usuario " . $nombre
        ]);
    }

} else {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
}
?>
