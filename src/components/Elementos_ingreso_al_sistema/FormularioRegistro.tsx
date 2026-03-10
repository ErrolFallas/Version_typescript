import React from 'react'
import { useState } from 'react' /* obligatorio para usar Hook del tipo useState */
import ServicesUsuario from '../../services/ServicesUsuario.jsx'
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

function FormularioRegistro() { /* entre aqui y return es el js */
    const [nombreUsuario, setNombreUsuario] = useState("")/* guardar datos y de que tipo ""son string, 0 number, false booleano,[]un array */
    /* useState el valor por defecto, pero con el const, se setea el valor */
    const [correoUsuario, setCorreoUsuario] = useState("") /* Es uno por cada input */ /* el set guarda los valores */

    const [contraseñaUsuario, setContraseñaUsuario] = useState("") /* camelCase en el set */

    const [confirmarContraseñaUsuario, setConfirmarContraseñaUsuario] = useState("")
    
   
    const navigate = useNavigate()
    function regresarHome() {
        navigate('/')
    }

    async function registroUsuario() { /* función del boton */
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
                !correoUsuario.includes("@") ||                     // no tiene @
                correoUsuario.indexOf("@") !== correoUsuario.lastIndexOf("@") || // más de una @
                !correoUsuario.includes(".") ||                     // no tiene punto
                correoUsuario.includes(" ") ||                      // tiene espacios
                correoUsuario.length < 12 ||                        // menor a 12
                correoUsuario.length > 64 ||                        // mayor a 64
                !tldPermitidos.some(tld => correoUsuario.endsWith(tld)) // TLD no permitido
            ) {

                Swal.fire({
                    title: "Correo inválido",
                    text: "El correo debe tener entre 12 y 64 caracteres, incluir una sola '@', contener un punto, no tener espacios y terminar en un dominio permitido (.com, .edu, .org, .es, .net, .mx).",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            } else {
                const datosUsuario = await ServicesUsuario.getUsuario()
                const correoExiste = datosUsuario.find(usuario => usuario.correo === correoUsuario)
                if (correoExiste) {
                    Swal.fire({
                        title: '¡error!',
                        text: 'Este correo ya está registrado',
                        icon: 'warning',
                        confirmButtonText: 'Aceptar'
                    });
                } else {
                    if (contraseñaUsuario.length < 6) { /* no ocupa el .value, el como esta diseñado ya lo toma como tal, por la parte html que colocamos que value= a estos y ahora ya se toma como valor siempre */
                        Swal.fire({
                            title: "Error",
                            text: "La contraseña debe tener al menos 6 caracteres",
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    } else {
                        if (confirmarContraseñaUsuario === contraseñaUsuario) {
                            /* const esAdmin=datosUsuario.filter(usuario=>usuario.correo===) */
                            let usuariosAlmacenados = {}
                            if (datosUsuario.length === 0) {
                                const objRegistro = {
                                    nombre: nombreUsuario,
                                    correo: correoUsuario,
                                    contraseña: contraseñaUsuario,
                                    rol: "Admin"
                                }
                                usuariosAlmacenados = await ServicesUsuario.postUsuario(objRegistro)
                            } else {
                                const objRegistro = {
                                    nombre: nombreUsuario,
                                    correo: correoUsuario,
                                    contraseña: contraseñaUsuario,
                                    rol: "Cliente"
                                }
                                usuariosAlmacenados = await ServicesUsuario.postUsuario(objRegistro)
                            }

                            if (usuariosAlmacenados) {
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
    return ( /* todo dentro de aqui es html */
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
                                    {/* el onchange es para captura el valor, setNombre, setCorreo o cualquier ser es para guarda el valor y react actualiza el estado y el input se vuelve a renderizar con su value  */}
                                </div>
                                <div className="registro-field-container">
                                    <label htmlFor="correoUsuario">Correo</label>
                                    <input type="email" name="correoUsuario" id="correoUsuario" value={correoUsuario} onChange={(evento) => setCorreoUsuario(evento.target.value)} /> {/* value es una variable */}
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
