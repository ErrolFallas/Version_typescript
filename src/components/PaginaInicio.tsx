import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ServicesProducto from "../services/ServicesProducto.jsx";
import { useState, useEffect } from 'react'


function PaginaInicio() {
    const navigate = useNavigate()
    async function loginCorrecto() {
        navigate("/RegistroUsuario")
    }
    const [busquedaCategoriaProductos, setBusquedaCategoriaProductos] = useState("")
    const [productos, setProductos] = useState([])

    useEffect(() => {
        obtenerProductos()
    }, [])

    const obtenerProductos = async () => {
        const respuesta = await ServicesProducto.getProductos()
        setProductos(respuesta)
    }
    const productosFiltrados = productos.filter(
        (producto) => busquedaCategoriaProductos === "" || producto.categoria === busquedaCategoriaProductos
    )

    let contenidoProductos

    if (productosFiltrados.length === 0) {
        contenidoProductos = <p>No hay productos disponibles en esta categoría.</p>
    }
    else {
        contenidoProductos = productosFiltrados.map((p) => (
            <div key={p.id}>
                <h3>{p.producto}</h3>
                <p>Precio: ₡{p.precio}</p>

            </div>
        ))
    }

    return (
        <div id='paginaInicio'>

            {/* ===== HERO ===== */}

            <section id="hero-section" className="section hero">

                <div className="hero-content">

                    <h1 className="hero-title">
                        MarketExplorer
                    </h1>

                    <h2>
                        Explora los productos disponibles en nuestra tienda
                    </h2>

                    <p className="hero-text"> MarketExplorer es una plataforma diseñada para visualizar los productos disponibles dentro del inventario de una tienda. Aquí podrás consultar artículos organizados por categorías y conocer su información básica de forma rápida.
                    </p>

                    <p className="hero-text"> Utiliza las herramientas del sistema para explorar las distintas secciones del catálogo y descubrir los productos que se encuentran disponibles actualmente.
                    </p>

                </div>

            </section>


            {/* ===== SOBRE LA PLATAFORMA ===== */}

            <section id="about-section" className="section">

                <div className="section-container">

                    <h2 className="section-title">
                        ¿Qué es MarketExplorer?
                    </h2>

                    <p className="section-text"> MarketExplorer funciona como un catálogo digital donde los usuarios pueden consultar los productos registrados dentro del sistema de inventario.
                    </p>

                    <p className="section-text"> El objetivo de esta plataforma es facilitar la visualización y organización de productos mediante categorías, permitiendo encontrar información rápidamente sin necesidad de navegar entre múltiples páginas.
                    </p>

                    <p className="section-text"> Este sistema está orientado a ofrecer una experiencia clara, simple y accesible para consultar los productos disponibles en la tienda.
                    </p>

                </div>

            </section>



            {/* ===== CATEGORÍAS DESTACADAS ===== */}

            <section id="categories-section" className="section bg-light">

                <div className="section-container">

                    <h2 className="section-title">
                        Categorías disponibles en MarketExplorer
                    </h2>

                    <p className="section-text"> Los productos dentro del sistema se encuentran organizados en diferentes categorías para facilitar su exploración. A continuación puedes ver las secciones principales disponibles dentro del catálogo.</p>

                    <div className="cards-container">

                        <div className="card category-card">
                            <h3 className="card-title">Frutas</h3>
                            <p className="card-text">Consulta frutas frescas registradas dentro del inventario del sistema.</p>
                        </div>

                        <div className="card category-card">
                            <h3 className="card-title">Verduras</h3>
                            <p className="card-text">Explora verduras disponibles organizadas dentro del catálogo.</p>
                        </div>

                        <div className="card category-card">
                            <h3 className="card-title">Carnes</h3>
                            <p className="card-text">Productos cárnicos disponibles dentro del inventario del sistema.</p>
                        </div>

                        <div className="card category-card">
                            <h3 className="card-title">Lácteos</h3>
                            <p className="card-text">Productos derivados de la leche disponibles dentro del catálogo.</p>
                        </div>

                        <div className="card category-card">
                            <h3 className="card-title">Cuidado personal</h3>
                            <p className="card-text">Artículos destinados al cuidado e higiene personal.</p>
                        </div>

                        <div className="card category-card">
                            <h3 className="card-title">Limpieza</h3>
                            <p className="card-text">Productos utilizados para la limpieza y mantenimiento del hogar.</p>
                        </div>

                        <div className="card category-card">
                            <h3 className="card-title">Panadería</h3>
                            <p className="card-text">Productos horneados y artículos relacionados con panadería.</p>
                        </div>

                        <div className="card category-card">
                            <h3 className="card-title">Bebidas</h3>
                            <p className="card-text">Bebidas disponibles dentro del sistema de productos. </p>
                        </div>

                        <div className="card category-card">
                            <h3 className="card-title">Snacks</h3>
                            <p className="card-text"> Productos rápidos y snacks registrados dentro del catálogo. </p>
                        </div>

                        <div className="card category-card">
                            <h3 className="card-title">Licores</h3>
                            <p className="card-text">Bebidas alcohólicas disponibles dentro del inventario del sistema.</p>
                        </div>

                    </div>

                </div>

            </section>
            {/* ===== Filtrar y mostrar productos por categoría ===== */}
            <section className="section">
                <div className="section-container">
                    <select name="busquedaCategoriaProductos" id="busquedaCategoriaProductos" value={busquedaCategoriaProductos} onChange={(evento) => setBusquedaCategoriaProductos(evento.target.value)}>
                        <option value="">Filtrar productos por categoría:</option>
                        <option value="frutas">Frutas</option>
                        <option value="verduras">Verduras</option>
                        <option value="carnes">Carnes</option>
                        <option value="lacteos">Lácteos</option>
                        <option value="cuidadopersonal">Cuidado personal</option>
                        <option value="limpieza">Limpieza</option>
                        <option value="panaderia">Panadería</option>
                        <option value="bebidas">Bebidas</option>
                        <option value="snacks">Snacks</option>
                        <option value="licores">Licores</option>
                    </select>
                </div>
                <div className="section-container">
                    <div className="cards-container">
                        <div className="card">
                            {contenidoProductos}
                        </div>
                    </div>
                </div>
            </section>


            {/* ===== REGISTRO ===== */}

            <section id="benefits-section" className="section">

                <div className="section-container">

                    <h2 className="section-title"> Crear una cuenta en MarketExplorer </h2>

                    <p className="section-text"> Regístrate dentro de la plataforma para formar parte del sistema y acceder a funciones relacionadas con la gestión de usuarios. </p>

                    <ul className="access-list">

                        <li className="access-item">Crear y administrar tu perfil de usuario</li>
                        <li className="access-item">Acceder a la plataforma de forma personalizada</li>
                        <li className="access-item">Interactuar con futuras funcionalidades del sistema</li>
                        <li className="access-item">Mantener tus datos organizados dentro de la aplicación</li>

                    </ul>

                    <button onClick={loginCorrecto} className="btn btn-secondary">
                        Crear Cuenta
                    </button>
                </div>
            </section>

        </div>
    )
}

export default PaginaInicio
