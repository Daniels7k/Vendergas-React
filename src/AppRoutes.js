import React, { useContext } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom"

import { AuthProvider, AuthContext } from "./contexts/AuthContext";


import Login from "./Pages/Login"
import PageLayout from "./Components/PageLayout"
import Empresas from "./Pages/Empresas";
import Clientes from "./Pages/Clientes"
import Produtos from "./Pages/Produtos"


function AppRoutes() {

    const Private = ({children}) => {

        const { authenticated } = useContext(AuthContext)

        console.log(authenticated)
        
        if(!authenticated) {
            return <Navigate to={"/login"} />
        }

        return children
    }

    return (

        <Router>

            <AuthProvider>
                <Routes>
                    <Route exact path="/test" element={<PageLayout/>} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/empresas" element={<Private><Empresas /></Private>} />
                    <Route exact path="/clientes" element={<Clientes />} />
                    <Route exact path="/produtos" element={<Produtos />} />
                </Routes>
            </AuthProvider>

        </Router>
    )
}

export default AppRoutes