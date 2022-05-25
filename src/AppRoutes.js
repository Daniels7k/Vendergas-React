import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom"
import Login from "./Pages/Login"
import Empresas from "./Pages/Empresas";
import Clientes from "./Pages/Clientes"
import Produtos from "./Pages/Produtos"


function AppRoutes () {
    return (
        <Router>
            <Routes>
            <Route exact path="/login" element={<Login/>}  />
            <Route exact path="/empresas" element={<Empresas/>}  />
            <Route exact path="/clientes" element={<Clientes/>}  />
            <Route exact path="/produtos" element={<Produtos/>}  />
            </Routes>
        </Router>
    )
}

export default AppRoutes