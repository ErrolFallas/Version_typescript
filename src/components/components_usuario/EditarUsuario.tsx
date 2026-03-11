import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ServicesUsuario from '../../services/ServicesUsuario'
import Swal from 'sweetalert2'

function EditarUsuario() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [datos, setDatos] = useState({
        nombre: "",
        contraseña: ""
    })

    useEffect(() => {
        async function cargarUsuario() {
            if (!id) return
            const usuario = await ServicesUsuario.getUsuariobyID(id)

            if (usuario) {
                setDatos({
                    nombre: usuario.nombre,
                    contraseña: usuario.contraseña
                })
            }
        }

        cargarUsuario()
    }, [id])

    function manejarCambios(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target

        setDatos(prev => {
            return {
                ...prev, [name]: value
            }
        })
    }

    async function guardarCambios() {
        if (!datos.nombre.trim() || !datos.contraseña.trim()) {
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
                if (id) {
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
