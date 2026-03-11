import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PanelRegistro from "../pages/PanelRegistro";
import PerfilUsuario from '../pages/PerfilUsuario';
import LoginUsuario from '../pages/LoginUsuario';
import Home from '../pages/Home';
import EdicionInfoUsuario from '../pages/EdicionInfoUsuario';
import PanelAdministrador from '../pages/PanelAdministrador';
import EditarRolesAdmin from '../pages/EdicionRolesRegistrados';
import PrivateRoutes from "../routes/PrivateRoutes";

const Routing = () => {

    return (
        <Router>
            <Routes>
                {/* rutas públicas */}
                <Route path='/' element={<Home />} />
                <Route path='/RegistroUsuario' element={<PanelRegistro />} />
                <Route path='/LoginUsuario' element={<LoginUsuario />} />

                {/* rutas privadas */}
                <Route path="/PerfilUsuario" element={<PrivateRoutes>
                    <PerfilUsuario />
                </PrivateRoutes>} />
                <Route path="/editar/:id" element={<PrivateRoutes> {/* protege las rutas, aunque tengan el link o direccion a estas páginas */}
                    <EdicionInfoUsuario />
                </PrivateRoutes>} />
                <Route path="/PanelAdministrador" element={<PrivateRoutes>
                    <PanelAdministrador />
                </PrivateRoutes>} />
                <Route path='/PanelGestionUsuarios' element={<PrivateRoutes>
                    <EditarRolesAdmin />
                </PrivateRoutes>} />
            </Routes>
        </Router>
    )
}

export default Routing
