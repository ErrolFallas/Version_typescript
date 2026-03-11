import { Producto, ActualizacionProducto } from "../types/producto";

/* GET es para obtener datos de una url a travez de un fetch y un await */

async function getProductos(): Promise<Producto[]> {
    try {
        const respuesta = await fetch("http://localhost:3000/producto");/* fetch es una funcion que permite hacer peticiones a una url */
        const datosProyectos = await respuesta.json();/* json es un formato de datos que se utiliza para intercambiar datos entre el servidor y el cliente */
        return datosProyectos;
    } catch (error) {
        console.error("Error al obtener los Productos", error);
        return [];
    }
}

async function getProductosID(id: number | string): Promise<Producto | undefined> {
    try {
        const respuesta = await fetch("http://localhost:3000/producto/" + id);/* fetch es una funcion que permite hacer peticiones a una url */
        const datosProyectos = await respuesta.json();/* json es un formato de datos que se utiliza para intercambiar datos entre el servidor y el cliente */
        return datosProyectos;
    } catch (error) {
        console.error("Error al obtener los Productos", error);
        return undefined;
    }
}


/* post es para agregar datos mediante parametros a una url*/
async function postProductos(Productos: Producto): Promise<Producto | undefined> {
    try {
        const respuesta = await fetch("http://localhost:3000/producto", { /* Con post se debe abrir una llavem donde especifica el tipo de metodo y el header(siempre se mantiene igual) */
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Productos) /* stringify es para convertir el objeto en string */
        });
        const datosProyectos = await respuesta.json();
        return datosProyectos;
    } catch (error) {
        console.error("Error al agregar los Productos", error);
        return undefined;
    }
}


/* put es para actualizar datos mediante parametros a una url*/
async function updateProductos(id: number | string, Productos: Producto): Promise<Producto | undefined> {
    try {
        const respuesta = await fetch(`http://localhost:3000/producto/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Productos)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar los Productos", error);
        return undefined;
    }
}


/* Delete */
async function deleteProductos(id: number | string): Promise<void> {
    try {
        await fetch(`http://localhost:3000/producto/${id}`, { /* Con put se debe abrir una llavem donde especifica el tipo de metodo y el header(siempre se mantiene igual) */
            method: "DELETE",

        });

    } catch (error) {
        console.error("Error al actualizar los Productos", error);
    }
}


/* Patch editar */
async function updatePatchProductos(id: number | string, Productos: ActualizacionProducto): Promise<Producto | undefined> {
    try {
        const respuesta = await fetch(`http://localhost:3000/producto/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Productos)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar los Productos", error);
        return undefined;
    }
}

export default { getProductos, getProductosID, updatePatchProductos, postProductos, deleteProductos, updateProductos };
