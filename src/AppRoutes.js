import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom"
import Login from "./Pages/Login"



function AppRoutes () {
    return (
        <Router>
            <Routes>
            <Route exact path="/login" element={<Login/>}  />
            
            </Routes>
        </Router>
    )
}

export default AppRoutes