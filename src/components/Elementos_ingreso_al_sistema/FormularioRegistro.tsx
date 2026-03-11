import { useState } from 'react'
import ServicesUsuario from '../../services/ServicesUsuario'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { Usuario } from '../../types/Usuario'

function FormularioRegistro() {
    const [nombreUsuario, setNombreUsuario] = useState<string>("")
    const [correoUsuario, setCorreoUsuario] = useState<string>("")
    const [contraseñaUsuario, setContraseñaUsuario] = useState<string>("")
    const [confirmarContraseñaUsuario, setConfirmarContraseñaUsuario] = useState<string>("")

    const navigate = useNavigate()

    function regresarHome() {
        navigate('/')
    }

    async function registroUsuario() {
        if (!contraseñaUsuario.trim() || !correoUsuario.trim() || !nombreUsuario.trim() || !confirmarContraseñaUsuario.trim()) {
            Swal.fire({
                title: '¡error!',
                text: 'todos los campos deben estar llenos',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        } else {
            const tldPermitidos = [".com", ".edu", ".org", ".es", ".net", ".mx"];

            if (
                !correoUsuario.includes("@") ||
                correoUsuario.indexOf("@") !== correoUsuario.lastIndexOf("@") ||
                !correoUsuario.includes(".") ||
                correoUsuario.includes(" ") ||
                correoUsuario.length < 12 ||
                correoUsuario.length > 64 ||
                !tldPermitidos.some(tld => correoUsuario.endsWith(tld))
            ) {
                Swal.fire({
                    title: "Correo inválido",
                    text: "El correo debe tener entre 12 y 64 caracteres, incluir una sola '@', contener un punto, no tener espacios y terminar en un dominio permitido (.com, .edu, .org, .es, .net, .mx).",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            } else {
                const datosUsuario = await ServicesUsuario.getUsuario()
                const correoExiste = datosUsuario.find((usuario: Usuario) => usuario.correo === correoUsuario)
                if (correoExiste) {
                    Swal.fire({
                        title: '¡error!',
                        text: 'Este correo ya está registrado',
                        icon: 'warning',
                        confirmButtonText: 'Aceptar'
                    });
                } else {
                    if (contraseñaUsuario.length < 6) {
                        Swal.fire({
                            title: "Error",
                            text: "La contraseña debe tener al menos 6 caracteres",
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    } else {
                        if (confirmarContraseñaUsuario === contraseñaUsuario) {
                            let resultado: Usuario | undefined;
                            if (datosUsuario.length === 0) {
                                const objRegistro: Usuario = {
                                    nombre: nombreUsuario,
                                    correo: correoUsuario,
                                    contraseña: contraseñaUsuario,
                                    rol: "Admin"
                                }
                                resultado = await ServicesUsuario.postUsuario(objRegistro)
                            } else {
                                const objRegistro: Usuario = {
                                    nombre: nombreUsuario,
                                    correo: correoUsuario,
                                    contraseña: contraseñaUsuario,
                                    rol: "Cliente"
                                }
                                resultado = await ServicesUsuario.postUsuario(objRegistro)
                            }

                            if (resultado) {
                                Swal.fire({
                                    title: '¡Éxito!',
                                    text: 'La operación se realizó correctamente',
                                    icon: 'success',
                                    confirmButtonText: 'Aceptar'
                                }).then(() => {
                                    navigate('/LoginUsuario')
                                })
                                setNombreUsuario("");
                                setCorreoUsuario("");
                                setContraseñaUsuario("");
                                setConfirmarContraseñaUsuario("")
                            }
                        } else {
                            Swal.fire({
                                title: '¡error!',
                                text: 'La contraseña no coincide',
                                icon: 'warning',
                                confirmButtonText: 'Aceptar'
                            });
                        }
                    }
                }
            }
        }
    }

    return (
        <div className="registro-container">
            <div className="registro-wrapper">
                <main className="registro-main">
                    <section className="registro-section">
                        <div className="registro-card">
                            <div className="registro-header-container">
                                <h2>Formulario de registro</h2>
                            </div>
                            <div className="registro-body">
                                <div className="registro-field-container">
                                    <label htmlFor="nombreUsuario">Usuario</label>
                                    <input type="text" name="nombreUsuario" id="nombreUsuario" value={nombreUsuario} onChange={(evento) => setNombreUsuario(evento.target.value)} />
                                </div>
                                <div className="registro-field-container">
                                    <label htmlFor="correoUsuario">Correo</label>
                                    <input type="email" name="correoUsuario" id="correoUsuario" value={correoUsuario} onChange={(evento) => setCorreoUsuario(evento.target.value)} />
                                </div>
                                <div className="registro-field-container">
                                    <label htmlFor="contraseñaUsuario">Contraseña</label>
                                    <input type="password" name="contraseñaUsuario" id="contraseñaUsuario" value={contraseñaUsuario} onChange={(evento) => setContraseñaUsuario(evento.target.value)} />
                                </div>
                                <div className="registro-field-container">
                                    <label htmlFor="confirmarContraseñaUsuario">Confirmar contraseña</label>
                                    <input type="password" name="confirmarContraseñaUsuario" id="confirmarContraseñaUsuario" value={confirmarContraseñaUsuario} onChange={(evento) => setConfirmarContraseñaUsuario(evento.target.value)} />
                                </div>
                                <div className="registro-boton-container">
                                    <button onClick={registroUsuario}>Guardar</button>
                                    <button onClick={regresarHome}>Volver al home</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default FormularioRegistro
