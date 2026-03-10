import React from 'react'
import { useState } from 'react' /* obligatorio para usar Hook del tipo useState */
import ServicesUsuario from '../../services/ServicesUsuario.jsx'
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

function ValidacionLogin() {
    const [correoGuardado, setCorreoGuardado] = useState("")
    const [contraseñaGuardado, setContraseñaGuardado] = useState("")
    const navigate = useNavigate()

    async function loginCorrecto() {
        if (!correoGuardado.trim() || !contraseñaGuardado.trim()) {
            Swal.fire({
                title: '¡error!',
                text: 'todos los campos deben estar llenos',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        } else {
            const datosUsuario = await ServicesUsuario.getUsuario()
            const usuarioRegistrado = datosUsuario.find(usuario => usuario.correo === correoGuardado)
            if (!usuarioRegistrado) {
                Swal.fire({
                    title: "Error",
                    text: "Este correo no está registrado",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            } else {
                const credencialesValidas = datosUsuario.find(usuario => usuario.correo === correoGuardado && usuario.contraseña === contraseñaGuardado)
                if (!credencialesValidas) {
                    Swal.fire({
                        title: "Error",
                        text: "Credenciales incorrectas",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                } else {
                    localStorage.setItem("usuarioLogueado", JSON.stringify(credencialesValidas));
                    Swal.fire({
                        title: "inicio exitoso",
                        text: "credenciales correctas",
                        icon: "success",
                        confirmButtonText: "OK"
                    }).then(() => {
                        let tipoUsuario = JSON.parse(localStorage.getItem("usuarioLogueado"))
                        /* console.log(tipoUsuario); */

                        if (tipoUsuario.rol === "Admin") {
                            navigate('/PanelAdministrador')
                        } else {
                            navigate('/PerfilUsuario')
                        }

                    })
                }

            }
        }
    }

    function redirigirRegistro() {
        navigate('/RegistroUsuario')
    }


    function regresarHome() {
        navigate('/')
    }

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <main className="login-main">
                    <section className="login-section">

                        <div className="login-card">

                            <div className="login-header-container">
                                <h2 className="login-titulo">
                                    Iniciar sesión
                                </h2>
                            </div>
                            <div className="login-field-container">
                                <label htmlFor="correoGuardado">Correo</label>
                                <input type="text" name='correoGuardado' id='correoGuardado' value={correoGuardado} onChange={(evento) => setCorreoGuardado(evento.target.value)} />
                            </div>
                            <div className="login-field-container">
                                <label htmlFor="contraseñaGuardado">Contraseña</label>
                                <input type="password" name='contraseñaGuardado' id='contraseñaGuardado' value={contraseñaGuardado} onChange={(evento) => setContraseñaGuardado(evento.target.value)} />
                            </div>
                            <div className="login-botones">
                                <button onClick={loginCorrecto} className="btnLogin">Iniciar sesión</button>
                                <button onClick={redirigirRegistro} className="btnRegistro">¿No tienes cuenta?</button>
                                <button onClick={regresarHome} className="btnRegistro">Volver al home</button>
                            </div>

                        </div>
                    </section>
                </main>
            </div>
        </div >
    )
}

export default ValidacionLogin
