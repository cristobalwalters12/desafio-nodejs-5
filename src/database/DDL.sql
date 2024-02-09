CREATE DATABASE joyas;

\c joyas;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE inventario (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  metal VARCHAR(50) NOT NULL,
  precio INTEGER NOT NULL CHECK (precio >= 0),
  stock INTEGER NOT NULL CHECK (stock >= 0),
  UNIQUE (nombre, categoria)
);