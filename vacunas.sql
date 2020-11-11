-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 11-11-2020 a las 22:07:03
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vacunas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calendario_vacuna`
--

CREATE TABLE `calendario_vacuna` (
  `id_calendadio_vacuna` int(11) NOT NULL,
  `id_meses` int(11) NOT NULL,
  `id_vacuna` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `calendario_vacuna`
--

INSERT INTO `calendario_vacuna` (`id_calendadio_vacuna`, `id_meses`, `id_vacuna`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 7, 1),
(5, 8, 1),
(6, 9, 1),
(7, 10, 1),
(8, 11, 1),
(9, 12, 1),
(10, 13, 1),
(11, 14, 1),
(12, 15, 1),
(13, 16, 1),
(14, 17, 1),
(15, 18, 1),
(16, 19, 1),
(17, 3, 2),
(18, 5, 2),
(19, 7, 2),
(20, 3, 3),
(21, 5, 3),
(22, 7, 3),
(23, 16, 3),
(24, 17, 3),
(25, 18, 3),
(26, 19, 3),
(27, 3, 4),
(28, 5, 4),
(29, 7, 4),
(30, 19, 4),
(31, 13, 4),
(32, 14, 4),
(33, 15, 4),
(34, 16, 4),
(35, 3, 5),
(36, 5, 5),
(37, 7, 5),
(38, 13, 5),
(39, 14, 5),
(40, 15, 5),
(41, 16, 5),
(42, 3, 6),
(43, 5, 6),
(44, 7, 6),
(45, 8, 6),
(46, 9, 6),
(47, 10, 6),
(48, 11, 6),
(49, 12, 6),
(50, 13, 6),
(51, 14, 6),
(52, 15, 6),
(53, 16, 6),
(54, 17, 6),
(55, 18, 6),
(56, 19, 6),
(57, 7, 10),
(58, 8, 10),
(59, 9, 10),
(60, 10, 10),
(61, 11, 10),
(62, 12, 10),
(63, 13, 10),
(64, 14, 10),
(65, 15, 10),
(66, 16, 10),
(67, 17, 10),
(68, 18, 10),
(69, 19, 10),
(70, 13, 7),
(71, 14, 7),
(72, 15, 7),
(73, 16, 7),
(74, 13, 8),
(75, 14, 8),
(76, 15, 8),
(77, 16, 8),
(78, 13, 9),
(79, 14, 9),
(80, 15, 9),
(81, 16, 9),
(82, 17, 9),
(83, 18, 9),
(84, 19, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios_menciones`
--

CREATE TABLE `comentarios_menciones` (
  `id_comentario_mencion` varchar(50) NOT NULL,
  `id_usuario` varchar(50) NOT NULL,
  `id_discucion_mencion` varchar(50) NOT NULL,
  `fecha_comentario` varchar(25) NOT NULL,
  `comentario` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comentarios_menciones`
--

INSERT INTO `comentarios_menciones` (`id_comentario_mencion`, `id_usuario`, `id_discucion_mencion`, `fecha_comentario`, `comentario`) VALUES
('23c41cff-3da3-4824-8c4b-48e72a79b5cd', '1Ewiyv2NBdWecgyp9fOOFYmVWu73', '23c41cff-3da3-4824-8c4b-48e72a79b5cd', '2020-10-09 18:53:42', 'otro comentarios de esos mismos.'),
('7e2e31a6-c123-45d7-8709-47563c33ea78', '1Ewiyv2NBdWecgyp9fOOFYmVWu73', '23c41cff-3da3-4824-8c4b-48e72a79b5cd', '2020-10-09 18:55:46', 'probando con los ultimos arreglos\n');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `discucion`
--

CREATE TABLE `discucion` (
  `id_discucion` varchar(50) NOT NULL,
  `asunto` varchar(50) NOT NULL,
  `contenido` text NOT NULL,
  `id_usuario` varchar(50) NOT NULL,
  `fecha_discucion` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `discucion`
--

INSERT INTO `discucion` (`id_discucion`, `asunto`, `contenido`, `id_usuario`, `fecha_discucion`) VALUES
('e8b143b0-6639-432d-9540-f455a23fc7ad', 'sintomas', 'llagaron hoy por si 2 vacuna de varicela, presentan sintomas de Hepatitis', '1Ewiyv2NBdWecgyp9fOOFYmVWu73', '2020-10-08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `discucion_menciones`
--

CREATE TABLE `discucion_menciones` (
  `id_discucion_mencion` varchar(50) NOT NULL,
  `id_paciente` varchar(50) NOT NULL,
  `id_discucion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `discucion_menciones`
--

INSERT INTO `discucion_menciones` (`id_discucion_mencion`, `id_paciente`, `id_discucion`) VALUES
('23c41cff-3da3-4824-8c4b-48e72a79b5cd', '54076bd1-af99-4589-888d-c0f27bf42156', 'e8b143b0-6639-432d-9540-f455a23fc7ad'),
('3f4c5dc9-d3a3-4277-baaa-591951578746', '95488c3a-a9d8-4418-b54c-947099aa442b', 'e8b143b0-6639-432d-9540-f455a23fc7ad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enfermedades`
--

CREATE TABLE `enfermedades` (
  `id_enfermedad` int(11) NOT NULL,
  `enfermedad_name` varchar(50) NOT NULL,
  `trasmicion` varchar(70) NOT NULL,
  `sintomas` varchar(250) NOT NULL,
  `complicaciones` varchar(350) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `enfermedades`
--

INSERT INTO `enfermedades` (`id_enfermedad`, `enfermedad_name`, `trasmicion`, `sintomas`, `complicaciones`) VALUES
(1, 'Varicela', 'Aire, contacto directo', 'Sarpullido, cansancio, dolor de cabeza, fiebre', 'Ampollas infectadas, trastornos hemorrágicos, encefalitis (inflamación del cerebro), neumonía (infección en los pulmones)'),
(2, 'Difteria', 'Aire, contacto directo', 'Dolor de garganta, fiebre moderada, debilidad, inflamación de los ganglios del cuello', 'Inflamación del músculo cardiaco, insuficiencia cardiaca, coma, parálisis, muerte'),
(8, 'Hib', 'Aire, contacto directo', 'Puede no causar síntomas a menos que la bacteria entre en la sangre', ' que la bacteria entre en la sangre	Meningitis (infección de las membranas que recubren el cerebro y la médula espinal), discapacidad intelectual, epiglotitis (infección que puede ser mortal, que puede bloquear la tráquea y causar problemas respiratorios graves), neumonía (infección en los pulmones), muerte'),
(9, 'Hepatitis A', 'Contacto directo, comida o agua contaminada', 'Puede no causar síntomas. Fiebre, dolor de estómago, pérdida del apetito, cansancio, vómito, ictericia (coloración amarilla de la piel y los ojos), orina oscura', 'Insuficiencia hepática, artralgia (dolor en las articulaciones) y trastornos de los riñones, del páncreas y de la sangre'),
(10, 'Hepatitis B', 'Contacto con sangre o líquidos corporales', 'Puede no causar síntomas. Fiebre, dolor de cabeza, debilidad, vómito, ictericia (coloración amarilla de los ojos y la piel), dolor en las articulaciones', 'Infección crónica del hígado, insuficiencia hepática, cáncer de hígado'),
(11, 'Influenza (gripe)', 'Aire, contacto directo', 'Fiebre, dolor muscular, dolor de garganta, tos, cansancio extremo', 'Neumonía (infección de los pulmones)'),
(12, 'Sarampion', 'Aire, contacto directo', 'Sarpullido, fiebre, tos, moqueo, conjuntivitis', 'Encefalitis (inflamación del cerebro), neumonía (infección en los pulmones), muerte'),
(13, 'Paperas', 'Aire, contacto directo', 'Inflamación de glándulas salivales (debajo de la mandíbula), fiebre, dolor de cabeza, cansancio, dolor muscular', 'Meningitis (infección de las membranas que recubren el cerebro y la médula espina), encefalitis (inflamación del cerebro), inflamación de los testículos o los ovarios, sordera'),
(14, 'Tosferina', 'Aire, contacto directo', 'Tos intensa, moqueo, apnea (interrupción de la respiración en los bebés)', 'Neumonía (infección en los pulmones), muerte'),
(15, 'Poliomielitis', 'Aire, contacto directo, por la boca', 'Puede no causar síntomas. Dolor de garganta, fiebre, náuseas, dolor de cabeza', 'Parálisis, muerte'),
(16, 'Vacuna', 'Aire, contacto directo', 'Puede no causar síntomas. Neumonía (infección en los pulmones)', 'Bacteriemia (infección en la sangre), meningitis (infección de las membranas que recubren el cerebro y la médula espinal), muerte'),
(17, 'Rotavirus', 'Por la boca', 'Diarrea, fiebre, vómito', 'Diarrea intensa, deshidratación'),
(18, 'Rubéola', 'Aire, contacto directo', 'A veces sarpullido, fiebre, inflamación de los ganglios linfáticos', 'Muy grave en las mujeres embarazadas: Puede causar aborto espontáneo, muerte fetal, parto prematuro, defectos de nacimiento'),
(19, 'Tétanos', 'Exposición a través de cortaduras en la piel', 'Rigidez del cuello y los músculos abdominales, dificultad para tragar, espasmos musculares, fiebre', 'Fractura de huesos, dificultad para respirar, muerte');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `meses`
--

CREATE TABLE `meses` (
  `id_mes` int(11) NOT NULL,
  `mes_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `meses`
--

INSERT INTO `meses` (`id_mes`, `mes_name`) VALUES
(1, 'Nacimiento'),
(2, '1 mes'),
(3, '2 mes'),
(4, '3 mes'),
(5, '4 mes'),
(6, '5 mes'),
(7, '6 mes'),
(8, '7 mes'),
(9, '8 mes'),
(10, '9 mes'),
(11, '10 mes'),
(12, '11 mes'),
(13, '12 mes'),
(14, '13 mes'),
(15, '14 mes'),
(16, '15 mes'),
(17, '16 mes'),
(18, '17 mes'),
(19, '18 mes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `id_paciente` varchar(50) NOT NULL,
  `nombres` varchar(25) NOT NULL,
  `apellidos` varchar(25) NOT NULL,
  `nacimiento` varchar(25) NOT NULL,
  `peso` double NOT NULL,
  `altura` double NOT NULL,
  `codigo` varchar(15) NOT NULL,
  `img` varchar(50) NOT NULL,
  `id_representante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id_paciente`, `nombres`, `apellidos`, `nacimiento`, `peso`, `altura`, `codigo`, `img`, `id_representante`) VALUES
('54076bd1-af99-4589-888d-c0f27bf42156', 'carlos', 'montoya', '2020-11-01T22:11:24-05:00', 41, 47, 'ITuEpGwbn', 'profile.jpeg', 1207345768),
('95488c3a-a9d8-4418-b54c-947099aa442b', 'andres', 'goyes', '2020-11-20T21:59:06-05:00', 250, 15, 'U6T2jBdLD', 'IMG_20201029_204740.jpg', 1207345768),
('b266f979-d964-42fc-a898-bb84b8b1fe25', 'miguel andrade', 'monserrate ramos', '2020-10-08T18:44:41-05:00', 110, 20, 'XF266lngX', 'example-oxxo.jpeg', 1204166478);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `representantes`
--

CREATE TABLE `representantes` (
  `cedula` int(11) NOT NULL,
  `nombres` varchar(40) NOT NULL,
  `apellidos` varchar(40) NOT NULL,
  `sexo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `representantes`
--

INSERT INTO `representantes` (`cedula`, `nombres`, `apellidos`, `sexo`) VALUES
(1204166478, 'Araceli', 'Villamar castro', 'Femenino'),
(1207345768, 'andres roberto', 'coello goyes', 'Masculino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` varchar(50) NOT NULL,
  `email` varchar(25) NOT NULL,
  `status` varchar(20) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `photoURL` varchar(200) NOT NULL,
  `fecha_registro` varchar(25) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `email`, `status`, `userName`, `photoURL`, `fecha_registro`, `isAdmin`) VALUES
('1Ewiyv2NBdWecgyp9fOOFYmVWu73', 'goyeselcoca@gmail.com', 'registrado', 'Andres Coello', 'https://lh3.googleusercontent.com/a-/AOh14GiDBCtjAfGIZVErBuH-e-rR78-dhDPlV2BQwFD9dw', '2020-10-07', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacunas`
--

CREATE TABLE `vacunas` (
  `id_vacuna` int(11) NOT NULL,
  `vacuna_name` varchar(40) NOT NULL,
  `cantidad` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `vacunas`
--

INSERT INTO `vacunas` (`id_vacuna`, `vacuna_name`, `cantidad`) VALUES
(1, 'HepB', 3),
(2, 'RV', 3),
(3, 'DTaP', 4),
(4, 'Hib', 4),
(5, 'PCV13', 4),
(6, 'IPV', 3),
(7, 'MMR', 1),
(8, 'Varicela', 1),
(9, 'HepA', 1),
(10, 'Influencia', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calendario_vacuna`
--
ALTER TABLE `calendario_vacuna`
  ADD PRIMARY KEY (`id_calendadio_vacuna`),
  ADD KEY `id_meses` (`id_meses`),
  ADD KEY `id_vacuna` (`id_vacuna`);

--
-- Indices de la tabla `comentarios_menciones`
--
ALTER TABLE `comentarios_menciones`
  ADD PRIMARY KEY (`id_comentario_mencion`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_discucion_mencion` (`id_discucion_mencion`);

--
-- Indices de la tabla `discucion`
--
ALTER TABLE `discucion`
  ADD PRIMARY KEY (`id_discucion`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `discucion_menciones`
--
ALTER TABLE `discucion_menciones`
  ADD PRIMARY KEY (`id_discucion_mencion`),
  ADD KEY `id_discucion` (`id_discucion`),
  ADD KEY `id_paciente` (`id_paciente`);

--
-- Indices de la tabla `enfermedades`
--
ALTER TABLE `enfermedades`
  ADD PRIMARY KEY (`id_enfermedad`);

--
-- Indices de la tabla `meses`
--
ALTER TABLE `meses`
  ADD PRIMARY KEY (`id_mes`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id_paciente`),
  ADD KEY `id_representante` (`id_representante`);

--
-- Indices de la tabla `representantes`
--
ALTER TABLE `representantes`
  ADD PRIMARY KEY (`cedula`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `vacunas`
--
ALTER TABLE `vacunas`
  ADD PRIMARY KEY (`id_vacuna`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `calendario_vacuna`
--
ALTER TABLE `calendario_vacuna`
  MODIFY `id_calendadio_vacuna` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT de la tabla `enfermedades`
--
ALTER TABLE `enfermedades`
  MODIFY `id_enfermedad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `meses`
--
ALTER TABLE `meses`
  MODIFY `id_mes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `vacunas`
--
ALTER TABLE `vacunas`
  MODIFY `id_vacuna` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `calendario_vacuna`
--
ALTER TABLE `calendario_vacuna`
  ADD CONSTRAINT `calendario_vacuna_ibfk_1` FOREIGN KEY (`id_meses`) REFERENCES `meses` (`id_mes`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `calendario_vacuna_ibfk_2` FOREIGN KEY (`id_vacuna`) REFERENCES `vacunas` (`id_vacuna`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `comentarios_menciones`
--
ALTER TABLE `comentarios_menciones`
  ADD CONSTRAINT `comentarios_menciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comentarios_menciones_ibfk_2` FOREIGN KEY (`id_discucion_mencion`) REFERENCES `discucion_menciones` (`id_discucion_mencion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `discucion`
--
ALTER TABLE `discucion`
  ADD CONSTRAINT `discucion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `discucion_menciones`
--
ALTER TABLE `discucion_menciones`
  ADD CONSTRAINT `discucion_menciones_ibfk_1` FOREIGN KEY (`id_discucion`) REFERENCES `discucion` (`id_discucion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `discucion_menciones_ibfk_2` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id_paciente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`id_representante`) REFERENCES `representantes` (`cedula`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
