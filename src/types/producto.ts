export type Producto = {
    id?: number
    producto: string
    categoria: string
    precio: number
    stock: number
}

export type ActualizacionProducto = Partial<Omit<Producto, 'id'>>
