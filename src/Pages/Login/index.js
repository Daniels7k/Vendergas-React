import React from "react"
import "./style.css"


function Login() {
    return (
        <div className="container">
            <div className="box" />
            <div className="box2">
                <div className="header">
                    <h1>VENDERGÁS</h1>
                    <h3>SISTEMA PARA REVENDAS DE GÁS E ÁGUA</h3>
                </div>
                <form className="form" >

                    <div className="field">
                        {/* name */}
                        <label htmlFor="name">Nome</label>
                        <input type="text" name="name" className="inputBox" />
                    </div>

                    <div className="field">
                        {/* Password */}
                        <label htmlFor="password">Senha</label>
                        <input type="password" name="password" className="inputBox" />
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