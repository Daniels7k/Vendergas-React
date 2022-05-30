import React, { useContext, useState } from "react"
import "./style.css"

import { AuthContext } from "../../contexts/AuthContext"

function Login() {

    const { handleLogin } = useContext(AuthContext)

    //Pegando valores do form
    const [ email, setEmail ] = useState()
    const [ senha, setSenha ] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        handleLogin( email, senha )
    }



    return (
        <div className="container">
            <div className="box" />
            <div className="box2">
                <div className="header">
                    <h1>VENDERGÁS</h1>
                    <h3>SISTEMA PARA REVENDAS DE GÁS E ÁGUA</h3>
                </div>
                <form className="form" onSubmit={ handleSubmit }>

                    <div className="field">
                        {/* name */}
                        <label htmlFor="name">Nome</label>
                        <input type="text" name="name" className="inputBox" value={email}  onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>

                    <div className="field">
                        {/* Password */}
                        <label htmlFor="password">Senha</label>
                        <input type="password" name="password" className="inputBox" value={senha}  onChange={(e) => {setSenha(e.target.value)}} />
                    </div>

                    <div className="actions">
                        <button type="submit">Logar</button>
                    </div>
                </form>

                <div className="registro">
                    <h5>Novo por aqui? </h5>
                    CLIQUE AQUI
                </div>
            </div>
        </div>
    )
}

export default Login