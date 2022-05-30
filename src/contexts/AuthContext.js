import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"

const AuthContext = createContext()

function AuthProvider({ children }) {



    const navigate = useNavigate()

    const [ authenticated, setAuthenticated ] = useState(false)
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
       const token = localStorage.getItem("token")

       if(token){
            setAuthenticated(true)
            api.defaults.headers.Authorization = token
       }

       setLoading(false)
    }, []);

    function handleLogin(email, senha) {

        api.post("/usuarios/login", {email, senha}).then((response) => {
            const token = response.data.token
            localStorage.setItem("token", JSON.stringify(token))
            api.defaults.headers.Authorization = token
            
            setAuthenticated(true)
        })

            navigate("/empresas")
    }

    if(loading){
        return <div> <h1>Loading...</h1> </div>
    }

    return (
        <AuthContext.Provider value={{ authenticated, handleLogin}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }