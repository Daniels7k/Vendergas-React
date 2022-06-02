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

            const userID = response.data.id
            const userName = response.data.nome

            const token = response.data.token

            localStorage.setItem("userID", userID)
            localStorage.setItem("token", JSON.stringify(token))
            localStorage.setItem("userName", userName )

            api.defaults.headers.Authorization = `Bearer ${token}`
            
            setAuthenticated(true)
            navigate(`/empresas`)
        })

            
    }

    function handleLogout () {

        setAuthenticated(false)

        localStorage.clear()

        api.defaults.headers.Authorization = false
        navigate("/login")
    }

    if(loading){
        return <div> <h1>Loading...</h1> </div>
    }

    return (
        <AuthContext.Provider value={{ authenticated, handleLogin, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }