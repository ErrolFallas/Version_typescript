import { useState } from 'react'
import ServicesUsuario from '../services/ServicesUsuario.jsx'
/* import { useState } from 'react' */
import { useEffect } from 'react' /* manipular información del componente */
/* import Swal from 'sweetalert2'; */
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function PanelUsuario() {
    const [usuarios, setUsuarios] = useState([]) /* va recibir productos del servidor, que va caer en un array vacio */

    const navigate = useNavigate()

    let usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"))

    useEffect(() => {/* obligatorio siempre y Aqui declara un funcion y el efecto de usos será a lo que apunta la flecha*/ /* Cuando me llegó dejo de renderizar , en este caso*/
        CargarUsuario()/* para que aparezca cada que entre a la página */
    }, []) /* SUPER OBLIGATORIO, para evitar que se congele la pagina, con esto le explica que estructura va usar */

    async function CargarUsuario() {
        const datosUsuario = await ServicesUsuario.getUsuario()
        const infoUsuarioFiltrado = datosUsuario.filter(u => u.id === usuarioLogueado.id)
        setUsuarios(infoUsuarioFiltrado) /* con este set, cambia el valor del set anterior que era array vacio, lo cambia ahora a los datos del servidor */
    }

    /* async function botonEditarUsuario(id) {
        const actualizarUsuario = await ServicesUsuario.getUsuariobyID(id)
        let nuevoNombre = prompt("Digita el nuevo valor del nombre:", actualizarUsuario.nombre)
        let usuarioActualizado = await ServicesUsuario.updatePatchUsuario(id, {nombre:nuevoNombre})
        console.log(usuarioActualizado);
        
    } */


    return (
        <div className="perfil-container">
            <div className="perfil-card">

                <div className="perfil-info">
                    {usuarios.map((usuario) =>
                        <div key={usuario.id} id='panelUsuario-info'>
                            <div id='panelUsuario-info-datos'>
                                <p>{usuario.nombre}</p>
                                <p>Correo: {usuario.correo}</p>
                                <p>Contraseña actual: {usuario.contraseña}</p>
                            </div>
                            <div id='panelUsuario-info-buttons'>
                                <button onClick={() => navigate(`/editar/${usuario.id}`)} className="botonEditarUsuario" >Editar</button>
                                {/*  <button onClick={botonEliminarUsuario} className="botonEliminarUsuario" >Eliminar</button> */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PanelUsuario
