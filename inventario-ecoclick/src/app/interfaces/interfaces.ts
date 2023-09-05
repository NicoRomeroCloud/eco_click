export interface ResponseObject {
    httpStatus: string;
    response: any;
}

export interface IProducto{
    id_producto: number,
    sku: string,
    nombre: string,
    descripcion: string,
    precio_costo: number,
    precio_lista: number,
    unidades: number,
    categoria: any,
    bodegas: any
}

export interface IUsuario{
    id_usuario: number,
    nombre: string,
    email: string,
    imagen: string
}