import { useState, useEffect } from 'react'
import ServicesUsuario from '../services/ServicesUsuario'
import { useNavigate } from 'react-router-dom';
import { Usuario } from '../types/Usuario';

function PanelUsuario() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]) /* va recibir productos del servidor, que va caer en un array vacio */

    const navigate = useNavigate()

    const usuarioLogueadoRaw = localStorage.getItem("usuarioLogueado");
    const usuarioLogueado = usuarioLogueadoRaw ? JSON.parse(usuarioLogueadoRaw) : null;

    useEffect(() => {/* obligatorio siempre y Aqui declara un funcion y el efecto de usos será a lo que apunta la flecha*/ /* Cuando me llegó dejo de renderizar , en este caso*/
        CargarUsuario()/* para que aparezca cada que entre a la página */
    }, []) /* SUPER OBLIGATORIO, para evitar que se congele la pagina, con esto le explica que estructura va usar */

    async function CargarUsuario() {
        if (!usuarioLogueado) return;
        const datosUsuario = await ServicesUsuario.getUsuario()
        const infoUsuarioFiltrado = datosUsuario.filter((u: Usuario) => u.id === usuarioLogueado.id)
        setUsuarios(infoUsuarioFiltrado) /* con este set, cambia el valor del set anterior que era array vacio, lo cambia ahora a los datos del servidor */
    }


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
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PanelUsuario
