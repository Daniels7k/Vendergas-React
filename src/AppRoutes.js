import React, { useContext } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    Link
} from "react-router-dom"

import { AuthProvider, AuthContext } from "./contexts/AuthContext";


import Login from "./Pages/Login"
import Empresas from "./Pages/Empresas";
import Clientes from "./Pages/Clientes"
import Produtos from "./Pages/Produtos"
import Pedidos from "./Pages/Pedidos"
import ErrorPage from "./Pages/404Page"



function AppRoutes() {

    

    const Private = ({ children }) => {

        const { authenticated } = useContext(AuthContext)

        if (!authenticated) {
            return <Navigate to={"/login"} />
        }

        return children
    }

    const AlreadyLogged = ({children}) => {
        const { handleLogout } = useContext(AuthContext)
        const { authenticated } = useContext(AuthContext)
        
        if(authenticated){
            return(
                <>
                <h1>Você já esta logado, Deslogue para entrar no /Login</h1>
                <Link to={"/empresas"}>Voltar para o app</Link>
                <button onClick={handleLogout} >Deslogar</button>
                </>
            )
        }

        return children
    }

    return (

        <Router>

            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={ <AlreadyLogged> <Login /> </AlreadyLogged>} />
                    <Route exact path="/empresas" element={<Private> <Empresas /> </Private>} />
                    <Route exact path="/clientes" element={<Private> <Clientes /> </Private>} />
                    <Route exact path="/produtos" element={<Private> <Produtos /> </Private>} />
                    <Route exact path="/pedidos" element={<Private> <Pedidos /> </Private>} />
                    <Route exact path="/404Error" element={<ErrorPage/>}/>
                    <Route exact path="/" element={<Navigate to={"/login"}/>}/>
                    <Route exact path="*" element={<Navigate to={"/404Error"} />} />
                </Routes>
            </AuthProvider>

        </Router>
    )
}

export default AppRoutes