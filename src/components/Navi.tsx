import React from 'react'
import { useState } from 'react' /* obligatorio para usar Hook del tipo useState, permite renderizar otra vez, tras cada cambio en la experiencia del usuario */
import { Link, useNavigate } from 'react-router-dom';

function Navi() {

    const navigate = useNavigate()

    const [userLogeado, setUserLogeado] = useState(
        JSON.parse(localStorage.getItem("usuarioLogueado"))
    )

    const cerrarSesion = () => {
        localStorage.removeItem("usuarioLogueado")
        setUserLogeado(null) /* actualizar nav tras cerrarSesion, perfecto si estas en home y cierras seccion, se espera que sigas en home, pero la nav debe cambiar */
        navigate("/") // redirige al login 
    }


    let contenidoNav
    if (userLogeado) {
        if (userLogeado.rol === "Admin") {
            contenidoNav = (
                <>
                    <Link to="/" id='nav-home'>Home</Link>
                    <Link to={"/PerfilUsuario"} id='nav-perfilUsuario'>Perfil Admin</Link>
                    {/* <Link to="/Formulario">Contact</Link> */}
                    <Link to={"/PanelAdministrador"} id='nav-panelAdmin'>Panel Admin</Link>
                    {/* <Link to="/Formulario">Contact</Link> */}
                    <Link to={"/PanelGestionUsuarios"}id='nav-panelAdmin'>Panel gestion de usuarios</Link>

                    <button onClick={cerrarSesion} id='nav-cerrarSesion'>Cerrar sesión</button>
                </>
            )
        } else {
            contenidoNav = (
                <>
                    <Link to="/" id='nav-home'>Home</Link>
                    <Link to={"/PerfilUsuario"} id='nav-perfilUsuario'>Usuario</Link>
                    {/* <Link to="/Formulario">Contact</Link> */}

                    <button onClick={cerrarSesion}>Cerrar sesión</button>
                </>
            )
        }

    } else {
        contenidoNav = (
            <>
                <Link to="/" id='nav-home'>Home</Link>
                <Link to="/LoginUsuario" id='nav-login'>Login</Link>
                <Link to="/RegistroUsuario" id='nav-registro'>Registro</Link>
            </>
        )
    }



    return (
        <div className="nav-container">
            <header className="nav-header">
                <div className="logo-container">
                    <h1 className="logo">MarketExplorer</h1>
                </div>
                <nav className="nav-menu">

                    <div className="nav-links">
                        {contenidoNav}
                    </div>

                </nav>
            </header>
        </div>
    )
}

export default Navi
