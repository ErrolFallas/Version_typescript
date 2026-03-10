/* GET es para obtener datos de una url a travez de un fetch y un await */

async function getUsuario() {
    try {
        const respuesta = await fetch("http://localhost:3000/usuario");/* fetch es una funcion que permite hacer peticiones a una url */
        const datosProyectos = await respuesta.json();/* json es un formato de datos que se utiliza para intercambiar datos entre el servidor y el cliente */
        return datosProyectos;
    } catch (error) {
        console.error("Error al obtener los usuarios", error);
    }
}

async function getUsuariobyID(id) {
    try {
        const respuesta = await fetch("http://localhost:3000/usuario/"+ id);/* fetch es una funcion que permite hacer peticiones a una url */
        const datosProyectos = await respuesta.json();/* json es un formato de datos que se utiliza para intercambiar datos entre el servidor y el cliente */
        return datosProyectos;
    } catch (error) {
        console.error("Error al obtener los usuarios", error);
    }
}


/* post es para agregar datos mediante parametros a una url*/
async function postUsuario(proyectos) {
    try {
        const respuesta = await fetch("http://localhost:3000/usuario", { /* Con post se debe abrir una llavem donde especifica el tipo de metodo y el header(siempre se mantiene igual) */
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(proyectos) /* stringify es para convertir el objeto en string */
        });
        const datosProyectos = await respuesta.json();
        return datosProyectos;
    } catch (error) {
        console.error("Error al agregar el usuario", error);
    }
}


/* put es para actualizar datos mediante parametros a una url*/
async function updateUsuario(id, proyectos) {
    try {
        const respuesta = await fetch(`http://localhost:3000/usuario/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(proyectos)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
    }
}


/* Delete */
async function deleteUsuario(id) {
    try {
        const respuesta = await fetch(`http://localhost:3000/usuario/${id}`, { /* Con put se debe abrir una llavem donde especifica el tipo de metodo y el header(siempre se mantiene igual) */
            method: "DELETE",

        });

    } catch (error) {
        console.error("Error al actualizar el usuario", error);
    }
}


/* Patch editar */
async function updatePatchUsuario(id, proyectos) {
    try {
        const respuesta = await fetch(`http://localhost:3000/usuario/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(proyectos)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
    }
}

export default { getUsuario, getUsuariobyID, updatePatchUsuario, postUsuario, deleteUsuario };