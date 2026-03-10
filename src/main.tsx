import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
/* import './index.css'  */
import "./styles/DashboardAdmin.css"
import "./styles/EditarRolesAdmin.css"
import "./styles/EditarUsuario.css"
import "./styles/Footer.css"
import "./styles/FormularioRegistro.css"
import "./styles/Navi.css"
import "./styles/PaginaInicio.css"
import "./styles/PanelUsuario.css"
import "./styles/ValidacionLogin.css"
import "./styles/Variables.css"
/* import "./styles/EditarUsuario.css" */
import App from './App.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
