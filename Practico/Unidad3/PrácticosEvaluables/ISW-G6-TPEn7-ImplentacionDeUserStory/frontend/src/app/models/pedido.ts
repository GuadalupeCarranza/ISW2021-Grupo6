import { Tarjeta } from "./tarjeta";

export class Pedido {
  id?: number;
  calle?: number;
  nroCalle?: string;
  descripcion?: Date;
  idCiudad?: number;
  tarjeta?: Tarjeta;
  efectivo?: number;

  constructor(
    id?: number,
    calle?: number,
    nroCalle?: string,
    descripcion?: Date,
    idCiudad?: number,
    tarjeta?: Tarjeta,
    efectivo?: number,
  ) {
    this.id = id;
    this.calle = calle;
    this.nroCalle = nroCalle;
    this.descripcion = descripcion;
    this.idCiudad = idCiudad;
    this.tarjeta = tarjeta;
    this.efectivo = efectivo;
  }
}
