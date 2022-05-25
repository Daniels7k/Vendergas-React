import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom"
import Login from "./Pages/Login"
import Empresas from "./Pages/Empresas";


function AppRoutes () {
    return (
        <Router>
            <Routes>
            <Route exact path="/login" element={<Login/>}  />
            <Route exact path="/empresas" element={<Empresas/>}  />
            </Routes>
        </Router>
    )
}

export default AppRoutes