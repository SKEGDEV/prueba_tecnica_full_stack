CREATE DATABASE camionsito;

USE camionsito;


/*
Creacion de tablas:
en este caso utilice una tabla de camiones, conductor  y ayudante como a su vez de clientes y viajes
la logica es la siguiente de estar un camion en estado libre este podra ser asignado a un viaje y se
podra realizar la confirmacion del viaje de tal y se podra realizar la edicion tanto de un camion como
de un viaje.
*/
CREATE TABLE camion(
id int primary key identity(1,1),
placas varchar(30),
km_por_lt int,
capacidad_cc float,
departamento varchar(70),
tipo_carga int,
estado int,
id_conductor int,
id_ayudante int
);

CREATE TABLE tipo_carga(
id int primary key identity(1,1),
tipo_carga varchar(40)
);

INSERT INTO tipo_carga VALUES ('Refrigerado'),
('No Refrigerado');

CREATE TABLE estado(
id int primary key identity(1,1),
estado varchar(40)
);

INSERT INTO estado VALUES('Libre'),
('Ocupado');

CREATE TABLE conductor(
id int primary key identity(1,1),
nombre_completo varchar(250),
DPI int,
NIT int,
edad int
);

CREATE TABLE ayudante(
id int primary key identity(1,1),
nombre_completo varchar(250),
DPI int,
NIT int,
edad int
);


CREATE TABLE cliente(
id int primary key identity(1,1),
nombre varchar(250),
NIT int,
direccion varchar(100)
);

CREATE TABLE viaje(
id int primary key identity(1,1),
id_cliente int,
id_camion int, 
lugar_salida int,
lugar_llegada int,
fecha_salida date,
fecha_llegada date
);

CREATE TABLE origen(
id int primary key identity(1,1),
lugar varchar(40)
);

CREATE TABLE destino(
id int primary key identity(1,1),
lugar varchar(40)
);

INSERT INTO origen VALUES
('Quetzaltenango'),
('Guatemala city'),
('Zacapa'),
('Progreso'),
('San Marcos'),
('Peten');

INSERT INTO destino VALUES
('Quetzaltenango'),
('Guatemala city'),
('Zacapa'),
('Progreso'),
('San Marcos'),
('Peten');
/*Relaciones entre tablas*/
/*constraints tabla camion*/
ALTER TABLE camion ADD CONSTRAINT tipo_carga_fk FOREIGN KEY (tipo_carga) REFERENCES tipo_carga(id);
ALTER TABLE camion ADD CONSTRAINT estado_fk FOREIGN KEY (estado) REFERENCES estado(id);
ALTER TABLE camion ADD CONSTRAINT conductor_fk FOREIGN KEY (id_conductor) REFERENCES conductor(id);
ALTER TABLE camion ADD CONSTRAINT  ayudante_fk FOREIGN KEY (id_ayudante) REFERENCES ayudante(id);
/*constraints tabla viaje*/

ALTER TABLE viaje ADD CONSTRAINT cliente_fk FOREIGN KEY (id_cliente) REFERENCES cliente(id);
ALTER TABLE viaje ADD CONSTRAINT camion_fk FOREIGN KEY (id_camion) REFERENCES camion(id);
ALTER TABLE viaje ADD CONSTRAINT origen_fk FOREIGN KEY (lugar_salida) REFERENCES origen(id);
ALTER TABLE viaje ADD CONSTRAINT  destino_fk FOREIGN KEY (lugar_llegada) REFERENCES destino(id);



/*procedimientos de inner join*/
GO
CREATE PROCEDURE get_trucks
AS
SELECT 
camion.id,
camion.placas,
camion.capacidad_cc,
camion.departamento,
estado.estado,
camion.km_por_lt,
conductor.nombre_completo as conductor,
ayudante.nombre_completo as ayudante,
tipo_carga.tipo_carga
FROM camion
INNER JOIN estado ON estado.id = camion.estado
INNER JOIN conductor ON conductor.id = camion.id_conductor
INNER JOIN ayudante ON ayudante.id = camion.id_ayudante
INNER JOIN  tipo_carga ON tipo_carga.id = camion.tipo_carga;
GO;


EXEC get_trucks;

