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


function AppRoutes () {
    return (
        <Router>
            <Routes>
            <Route exact path="/login" element={<Login/>}  />
            <Route exact path="/empresas" element={<Empresas/>}  />
            <Route exact path="/clientes" element={<Clientes/>}  />
            </Routes>
        </Router>
    )
}

export default AppRoutes