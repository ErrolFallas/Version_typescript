import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PanelRegistro from "../pages/PanelRegistro";
import PerfilUsuario from '../pages/PerfilUsuario';
import LoginUsuario from '../pages/LoginUsuario';
import Home from '../pages/Home';
import EdicionInfoUsuario from '../pages/EdicionInfoUsuario';
import PanelAdministrador from '../pages/PanelAdministrador';
import EditarRolesAdmin from '../pages/EdicionRolesRegistrados';

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
                <Route path='/PanelGestionUsuarios' element={<EditarRolesAdmin />} />
            </Routes>
        </Router>
    )
}

export default Routing
