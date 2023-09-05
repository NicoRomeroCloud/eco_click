
import { IProducto } from "./interfaces";

export class ICategoria{
    id_categoria!: number;
    nombre!: string;
    descripcion!: string;
    productos!: IProducto;
}