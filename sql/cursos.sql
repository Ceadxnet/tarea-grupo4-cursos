CREATE TABLE IF NOT EXISTS cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    docente VARCHAR(120) NOT NULL,
    creditos INT NOT NULL,
    horas INT NOT NULL,
    modalidad ENUM('Presencial', 'Virtual', 'Hibrida') NOT NULL
);
