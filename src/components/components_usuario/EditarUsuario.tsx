import { useState, useEffect } from 'react' /* guarda el estado del componente con usestate y ejecutar el código automaticamente con useeffect */
import { useParams, useNavigate } from 'react-router-dom'
import ServicesUsuario from '../../services/ServicesUsuario.jsx'
import Swal from 'sweetalert2'

function EditarUsuario() { /* se ejecuta solo si hay un render y hay un render, solo si hay un cambio de estado o se cambia una propiedad */
    /* METODO PATCH con el metodo Ruta independiente tipo página de edición */
    const { id } = useParams()/* usar parametro, el cual es el mismo de la ruta, el parametro unico es el id , es decir : obtener el id de la URL y con ello ya se sabe que usuario es el que debe ser modificado*/
    const navigate = useNavigate()

    const [datos, setDatos] = useState({
        nombre: "",
        contraseña: ""
    }) /* el estado inicial es un objeto con estas propiedades, cuyos valores iniciales estan vacias, es decir datos es igual al objeto y dentro del objeto ya tiene propiedades */

    useEffect(() => {
        async function cargarUsuario() {
            const usuario = await ServicesUsuario.getUsuariobyID(id)

            setDatos({
                nombre: usuario.nombre,
                contraseña: usuario.contraseña
            }) /* ahora se trae del dbjson la informacion y la busca mediante el id, el cual extrajo de paramans, con eso se trae usuario. propiedad y le dice que los nuevos valores o los valores actualizados serán los que se trajo con el get del db json de ese usuario, de esta forma , al abrir la edicion, los campos del input, contendran los datos del usuario para que tenga un referente de como esta actualmente y con ello tomar decision a cual cambiar */
        }

        cargarUsuario()
    }, [id])


    function manejarCambios(e: React.ChangeEvent<HTMLInputElement>) { /* nombre del input y valor de ese input, se encuta al tocar el input */
        const { name, value } = e.target

        setDatos(prev => { /* el prev es el estado anterior */
            return {
                ...prev, [name]: value /* ..., el estado cambio,vuelve a renderizar y prev es que tome en cuenta el estado anterior */
            }
        })
    }


    async function guardarCambios() {/* la función para guardar los datos */
        if (!datos.nombre.trim() || !datos.contraseña.trim()) { /* condicionantes antes de hacer el patch y se termine la funcion guardar */
            Swal.fire({
                title: '¡error!',
                text: 'todos los campos deben estar llenos',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        } else {
            if (datos.contraseña.length < 6) {
                Swal.fire({
                    title: 'Contraseña inválida',
                    text: 'La contraseña debe tener al menos 6 caracteres',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar'
                })
            } else {
                await ServicesUsuario.updatePatchUsuario(id, datos)
                Swal.fire({
                    title: "inicio exitoso",
                    text: "credenciales correctas",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    navigate("/PerfilUsuario")

                })
            }
        }
    }


    return (
        <div id="editar-usuario-container" className="editar-usuario-container">
            <section id="editar-usuario-section" className="editar-usuario-section">
                <h2 className="editar-usuario-title">Editar Usuario</h2>
                <div id='editar-usuario-nombre'>
                    <label>Nombre</label>
                    <input name="nombre" value={datos.nombre} onChange={manejarCambios} />
                </div>

                <div id='editar-usuario-contraseña'>
                    <label>Contraseña</label>
                    <input name="contraseña" value={datos.contraseña} onChange={manejarCambios} />
                </div>

                <br />
                <div id="editar-usuario-buttons" className="editar-usuario-buttons">
                    <button className="editar-usuario-btn guardar-btn" onClick={guardarCambios}> Guardar</button>

                    <button className="editar-usuario-btn cancelar-btn" onClick={() => navigate("/PerfilUsuario")}>Cancelar</button>
                </div>
            </section>
        </div>
    )
}

export default EditarUsuario