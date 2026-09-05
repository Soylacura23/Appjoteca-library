-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 04-09-2026 a las 06:02:30
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `appjoteca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autores`
--

CREATE TABLE `autores` (
  `id_autor` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bibliotecas`
--

CREATE TABLE `bibliotecas` (
  `id_biblioteca` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colecciones`
--

CREATE TABLE `colecciones` (
  `id_coleccion` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `id_biblioteca` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dewey`
--

CREATE TABLE `dewey` (
  `id_dewey` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `codigo` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `editoriales`
--

CREATE TABLE `editoriales` (
  `id_editorial` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejemplares`
--

CREATE TABLE `ejemplares` (
  `id_ejemplar` int(11) NOT NULL,
  `fk_id_libro_ejemplar` int(11) DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  `id_coleccion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `id_libro` int(11) NOT NULL,
  `id_editorial` int(11) DEFAULT NULL,
  `id_materia` int(11) DEFAULT NULL,
  `id_tipo_material` int(11) DEFAULT NULL,
  `isbn` varchar(50) DEFAULT NULL,
  `titulo` varchar(50) DEFAULT NULL,
  `edicion` varchar(30) DEFAULT NULL,
  `ciudad` varchar(30) DEFAULT NULL,
  `publicacion_year` year(4) DEFAULT NULL,
  `serie` varchar(20) DEFAULT NULL,
  `volumen` int(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libro_autor`
--

CREATE TABLE `libro_autor` (
  `id_detalle` int(11) NOT NULL,
  `id_libro` int(11) DEFAULT NULL,
  `id_autor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `id_materia` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `id_dewey` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamos`
--

CREATE TABLE `prestamos` (
  `id_prestamo` int(11) NOT NULL,
  `id_ejemplar` int(11) DEFAULT NULL,
  `id_reserva` int(11) DEFAULT NULL,
  `fecha_prestamo` date DEFAULT NULL,
  `fecha_devolucion_prevista` date DEFAULT NULL,
  `fecha_devolucion_real` date DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  `observaciones` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id_reserva` int(11) NOT NULL,
  `fk_id_usuario_reserva` int(11) DEFAULT NULL,
  `fk_id_libro_reserva` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `fecha_reserva` date DEFAULT NULL,
  `fecha_limite` date DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  `observacion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre`) VALUES
(1, 'estudiante'),
(2, 'profesor'),
(3, 'bibliotecario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_materiales`
--

CREATE TABLE `tipos_materiales` (
  `id_tipo_material` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `id_rol` int(11) DEFAULT NULL,
  `nombre_apellido` varchar(100) DEFAULT NULL,
  `nombre_usuario` varchar(30) DEFAULT NULL,
  `correo_institucional` varchar(60) DEFAULT NULL,
  `documento` varchar(25) DEFAULT NULL,
  `foto_documento` varchar(512) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `foto_perfil` varchar(50) DEFAULT NULL,
  `biografia` text DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `fecha_registro` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `id_rol`, `nombre_apellido`, `nombre_usuario`, `correo_institucional`, `documento`, `foto_documento`, `password`, `foto_perfil`, `biografia`, `estado`, `fecha_registro`) VALUES
(4, 1, 'Simón Montoya Soto', 'simon.ms', 'simon.montoya@iemanueljbetancur.edu.co', '1186463034', NULL, '$2y$10$bT14geo/yIKlEE114AAL0e19WAy0pessoyQc.iw.f9.nTvyeQnIni', NULL, NULL, '1', '2026-08-30'),
(5, 1, 'simoncito', 'simon.me', 'simon.el@iemanueljbetancur.edu.co', '244242424242', NULL, '$2y$10$wWtZKyazb/24Ro/EG71m2OD6SqGhJuYYT1UycYJbYmUddz05GVtai', NULL, NULL, NULL, '2026-08-30'),
(6, 1, 'salome Montoya Pareja', 'salome.montoyap', 'salome.montoya@iemanueljbetancur.edu.co', '10236777544', NULL, '$2y$10$TB6ikW2kERzCx8/ncWiAyuvnf22V8IuT7sO23/z9lcRQYx54AVPQ6', NULL, NULL, NULL, '2026-09-02');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autores`
--
ALTER TABLE `autores`
  ADD PRIMARY KEY (`id_autor`);

--
-- Indices de la tabla `bibliotecas`
--
ALTER TABLE `bibliotecas`
  ADD PRIMARY KEY (`id_biblioteca`);

--
-- Indices de la tabla `colecciones`
--
ALTER TABLE `colecciones`
  ADD PRIMARY KEY (`id_coleccion`),
  ADD KEY `id_biblioteca` (`id_biblioteca`);

--
-- Indices de la tabla `dewey`
--
ALTER TABLE `dewey`
  ADD PRIMARY KEY (`id_dewey`);

--
-- Indices de la tabla `editoriales`
--
ALTER TABLE `editoriales`
  ADD PRIMARY KEY (`id_editorial`);

--
-- Indices de la tabla `ejemplares`
--
ALTER TABLE `ejemplares`
  ADD PRIMARY KEY (`id_ejemplar`),
  ADD KEY `fk_id_libro_ejemplar` (`fk_id_libro_ejemplar`),
  ADD KEY `id_coleccion` (`id_coleccion`);

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`id_libro`),
  ADD KEY `id_editorial` (`id_editorial`),
  ADD KEY `id_materia` (`id_materia`),
  ADD KEY `id_tipo_material` (`id_tipo_material`);

--
-- Indices de la tabla `libro_autor`
--
ALTER TABLE `libro_autor`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_libro` (`id_libro`),
  ADD KEY `id_autor` (`id_autor`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`id_materia`),
  ADD KEY `id_dewey` (`id_dewey`);

--
-- Indices de la tabla `prestamos`
--
ALTER TABLE `prestamos`
  ADD PRIMARY KEY (`id_prestamo`),
  ADD KEY `id_ejemplar` (`id_ejemplar`),
  ADD KEY `id_reserva` (`id_reserva`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `fk_id_usuario_reserva` (`fk_id_usuario_reserva`),
  ADD KEY `fk_id_libro_reserva` (`fk_id_libro_reserva`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `tipos_materiales`
--
ALTER TABLE `tipos_materiales`
  ADD PRIMARY KEY (`id_tipo_material`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`) USING BTREE,
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ejemplares`
--
ALTER TABLE `ejemplares`
  MODIFY `id_ejemplar` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `colecciones`
--
ALTER TABLE `colecciones`
  ADD CONSTRAINT `id_biblioteca` FOREIGN KEY (`id_biblioteca`) REFERENCES `bibliotecas` (`id_biblioteca`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ejemplares`
--
ALTER TABLE `ejemplares`
  ADD CONSTRAINT `fk_id_libro_ejemplar` FOREIGN KEY (`fk_id_libro_ejemplar`) REFERENCES `libros` (`id_libro`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_coleccion` FOREIGN KEY (`id_coleccion`) REFERENCES `colecciones` (`id_coleccion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `libros`
--
ALTER TABLE `libros`
  ADD CONSTRAINT `id_editorial` FOREIGN KEY (`id_editorial`) REFERENCES `editoriales` (`id_editorial`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_materia` FOREIGN KEY (`id_materia`) REFERENCES `materias` (`id_materia`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_tipo_material` FOREIGN KEY (`id_tipo_material`) REFERENCES `tipos_materiales` (`id_tipo_material`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `libro_autor`
--
ALTER TABLE `libro_autor`
  ADD CONSTRAINT `id_autor` FOREIGN KEY (`id_autor`) REFERENCES `autores` (`id_autor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_libro` FOREIGN KEY (`id_libro`) REFERENCES `libros` (`id_libro`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `materias`
--
ALTER TABLE `materias`
  ADD CONSTRAINT `id_dewey` FOREIGN KEY (`id_dewey`) REFERENCES `dewey` (`id_dewey`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `prestamos`
--
ALTER TABLE `prestamos`
  ADD CONSTRAINT `id_ejemplar` FOREIGN KEY (`id_ejemplar`) REFERENCES `ejemplares` (`id_ejemplar`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_reserva` FOREIGN KEY (`id_reserva`) REFERENCES `reservas` (`id_reserva`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `fk_id_libro_reserva` FOREIGN KEY (`fk_id_libro_reserva`) REFERENCES `libros` (`id_libro`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_id_usuario_reserva` FOREIGN KEY (`fk_id_usuario_reserva`) REFERENCES `usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `id_rol` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
