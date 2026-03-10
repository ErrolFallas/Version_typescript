import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PanelRegistro from "../pages/PanelRegistro.jsx";
import PerfilUsuario from '../pages/PerfilUsuario.jsx';
import LoginUsuario from '../pages/LoginUsuario.jsx';
import Home from '../pages/Home.jsx';
import EdicionInfoUsuario from '../pages/EdicionInfoUsuario.jsx';
import PanelAdministrador from '../pages/PanelAdministrador.jsx';
import EditarRolesAdmin from '../pages/EdicionRolesRegistrados.jsx';

const Routing = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/RegistroUsuario' element={<PanelRegistro />} />
                <Route path="/PerfilUsuario" element={<PerfilUsuario />} />
                <Route path='/LoginUsuario' element={<LoginUsuario />} />
                <Route path="/editar/:id" element={<EdicionInfoUsuario />} />
                <Route path="/PanelAdministrador" element={<PanelAdministrador />} />
                <Route path='/PanelGestionUsuarios'element={<EditarRolesAdmin/>}/>
            </Routes>
        </Router>
    )
}

export default Routing
