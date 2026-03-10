import React from 'react'
import ServicesUsuario from '../../services/ServicesUsuario.jsx'
import { useEffect } from 'react'
import Swal from 'sweetalert2';
import { useState } from 'react'

function EditarRolesAdmin() {
    const [usuariosRegistrados, setUsuariosRegistrados] = useState([])


    useEffect(() => {
        async function cargarRolesUsuario() {
            let usuariosAlmacenados = await ServicesUsuario.getUsuario()
            setUsuariosRegistrados(usuariosAlmacenados)
        }
        cargarRolesUsuario()
    }, [])

    async function botonEliminarUsuario(id) { /* eliminar producto del stock */
        const resultado = await Swal.fire({
            title: "¿Seguro que quieres eliminar este usuario?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (resultado.isConfirmed) {
            await ServicesUsuario.deleteUsuario(id);
            let usuariosAlmacenados = await ServicesUsuario.getUsuario()
            setUsuariosRegistrados(usuariosAlmacenados)

        }
    }
    const [drawerAbierto, setDrawerAbierto] = useState(false)
    const [gestionarUsuario, setGestionarUsuario] = useState(null) /* variable de estado que inicialmente no tiene ningún usuario, no se ha seleccionado ningun usuario en su estado inicial y al tocar el usuario le dice a cual usuario va manipular */
    const [editarRol, setEditarRol] = useState("")


    function abrirDrawer(usuario) { /* se prepara el panel de edición */
        setGestionarUsuario(usuario) /* el nuevo valor de gestionarUsuario es toda la informacion del usuario y es muy importante definir esto, porque es el id que se va usar para el patch, es como hacer un get y el let, ahora tiene el valor o datos del db.json, es como su representante en este componente */
        setEditarRol(usuario.rol) /* el select tendrá el valor actual */
        setDrawerAbierto(true) /* solo si es true se abre el drawer y activa el render condicional */
    }

    async function realizarCambioRol() {
        const informacionActualizada = {
            rol: editarRol
        }
        if (!gestionarUsuario  || !editarRol) return
        await ServicesUsuario.updatePatchUsuario(gestionarUsuario.id, informacionActualizada)
        Swal.fire("Rol actualizado", "", "success")
        let usuariosAlmacenados = await ServicesUsuario.getUsuario()
        setUsuariosRegistrados(usuariosAlmacenados)
        setDrawerAbierto(false)
    }


    return (
        <div>
            {usuariosRegistrados.map((usuario) => /* aquí recorre el array */
                <div key={usuario.id} id='paneledicionroles'>
                    <div id="presentarUsuarios">
                        <p>Nombre:{usuario.nombre}</p>
                        <p>Correo: {usuario.correo}</p>
                        <p>Rol actual: {usuario.rol}</p>

                    </div>
                    <div id='botonesModificarRoles'>
                        <button onClick={() => abrirDrawer(usuario)} className="botonEditarUsuario" >Editar Roles</button>
                        <button className='botonEliminarUsuario' onClick={() => botonEliminarUsuario(usuario.id)} >Eliminar usuario</button>
                    </div>
                </div>
            )}


            {drawerAbierto && (
                <div className="drawerOverlayUsuarios">

                    <div className="drawerPanelUsuarios">

                        <h2>Editar Rol</h2>
                        <h3>Usuario: {gestionarUsuario?.nombre}</h3>
                        <label htmlFor='editarRol'>Rol:</label>
                        <select value={editarRol} onChange={(e) => setEditarRol(e.target.value)} name="editarRol" id="editarRol"> {/* el valor del select es el estado y el onChange es para decir que este cambiará, con la funcion del cambio de valor del estado inicial*/}
                            <option value="Cliente">Cliente</option>
                            <option value="Admin">Admin</option>
                        </select>
                        <div className="drawerBotonesUsuarios">
                            <button onClick={realizarCambioRol}>Guardar cambios</button>

                            <button onClick={() => setDrawerAbierto(false)}> {/* para cerrar pestaña lateral, sin cambios */}Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditarRolesAdmin
