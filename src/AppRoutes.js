import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom"

function AppRoutes () {
    return (
        <Router>
            <Routes>
            <Route exact path="/login" />
            <Route exact path="/home" />
            </Routes>
        </Router>
    )
}

export default AppRoutes