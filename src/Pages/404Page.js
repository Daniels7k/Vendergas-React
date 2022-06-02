import React from "react";
import {Link} from "react-router-dom"

function ErrorPage () {
    return(
        <>
        <h1>404 Error Page</h1>
        <h3> This Page Not Exist</h3>
        <Link to={"/login"} >Volte para o início!</Link>
        </>
    )
}

export default ErrorPage