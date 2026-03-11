import {ReactNode} from "react"
import { Navigate } from "react-router-dom"


type PrivateRoutePagina = { /* este ype es obligatorio copiar y égar siempre */
    children: ReactNode
}

const PrivateRoute = ({ children }: PrivateRoutePagina) => {/* la ruta privada de la página */
const estaAutenticado = localStorage.getItem("token")

    if (!estaAutenticado) { /* si no esta autentificado */ 
 return <Navigate to="/LoginUsuario" />
    }

    return children
}
export default PrivateRoute
