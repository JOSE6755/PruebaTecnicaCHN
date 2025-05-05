DROP TABLE IF EXISTS Pagos;
DROP TABLE IF EXISTS Prestamo;
DROP TABLE IF EXISTS Estado;
DROP TABLE IF EXISTS Clientes;

CREATE TABLE Clientes (
    id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(200) NOT NULL,
    apellido VARCHAR(200) NOT NULL,
    dpi VARCHAR(13) NOT NULL UNIQUE,
    fecha_nac DATE NOT NULL,
    direccion VARCHAR(MAX) NOT NULL,
    correo_electronico VARCHAR(400) NOT NULL UNIQUE,
    telefono VARCHAR(8) NOT NULL,
    eliminado INT DEFAULT 0
);

CREATE TABLE Estado (
    idEstado INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Prestamo (
    idPrestamo INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    monto DECIMAL NOT NULL,
    plazo INT NOT NULL,
    idEstado INT DEFAULT 1 FOREIGN KEY REFERENCES Estado(idEstado),
    motivo VARCHAR(1000) DEFAULT '',
    saldoPagado DECIMAL NOT NULL DEFAULT 0,
    fechaSolicitud DATETIME2 NOT NULL,
    fechaUltimoPago DATETIME2,
    eliminado INT DEFAULT 0,
    idCliente INT NOT NULL FOREIGN KEY REFERENCES Clientes(id)
);

CREATE TABLE Pagos (
    idPago INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    cantidad DECIMAL NOT NULL,
    montoRestante DECIMAL NOT NULL,
    fechaPago DATETIME2 NOT NULL,
    idPrestamo INT NOT NULL FOREIGN KEY REFERENCES Prestamo(idPrestamo)
);

INSERT INTO Clientes (nombre, apellido, dpi, fecha_nac, direccion, correo_electronico, telefono)
VALUES 
('Ana María', 'López', '1234567890123', '1990-05-12', 'Avenida Reforma 123, Zona 9, Ciudad de Guatemala', 'ana.lopez@gmail.com', '45671234'),
('Carlos', 'Ramírez', '2345678901234', '1985-11-30', 'Calle Real 45, Zona 1, Quetzaltenango', 'carlos.ramirez@hotmail.com', '57893412'),
('Luis', 'Gómez', '3456789012345', '2000-07-21', 'Boulevard Vista Hermosa 89, Zona 15, Ciudad de Guatemala', 'luisgomez@yahoo.com', '32104567'),
('María José', 'Pérez', '4567890123456', '1995-03-18', 'Colonia Mariscal 17, Zona 11, Mixco', 'mj.perez@gmail.com', '77441230'),
('Sofía', 'Hernández', '5678901234567', '1988-12-05', 'Residenciales del Norte, Zona 17, Ciudad de Guatemala', 'sofia.hernandez@gmail.com', '66778899');

INSERT INTO Estado (nombre) VALUES 
('Pendiente'),
('Aprobado'),
('En proceso'),
('Cancelado'),
('Pagado');

INSERT INTO Prestamo (monto, plazo, idEstado, motivo, saldoPagado, fechaSolicitud, fechaUltimoPago, idCliente)
VALUES 
(10000.00, 12, 1, '', 0.00, '2025-05-01 10:00:00', NULL, 1),
(5000.00, 6, 2, '', 500.00, '2025-04-15 09:30:00', '2025-05-01 08:00:00', 1),
(7500.00, 10, 4, 'Cliente canceló la solicitud', 0.00, '2025-04-20 11:15:00', NULL, 2);

