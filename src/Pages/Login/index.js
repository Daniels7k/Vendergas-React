import React, { useContext, useState } from "react"
import "./style.css"
import { AuthContext } from "../../contexts/AuthContext"
import RegistroDialog from "../../dialogsForm/RegistroDialog"
import Alert from '@mui/material/Alert';
import * as yup from "yup"


function Login() {

    const { handleLogin } = useContext(AuthContext)

    //Pegando valores do form
    const [ email, setEmail ] = useState()
    const [ senha, setSenha ] = useState()

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const handleSubmit = async (e) => {
         e.preventDefault()
        
        if (!(await validate())) return
        handleLogin( email, senha ).catch((error) => {
            console.log(error)
            setStatus( {type:"error", message: error.response.data.message})
        })
        setStatus("")
    }


    async function validate() {
        let schema = yup.object().shape({
            senha: yup.string("Senha obrigatória!").required("Senha obrigatória!"),
            email: yup.string("Email obrigatório!").required("Email obrigatório!"),
        })
        try {
            await schema.validate({ email, senha })
            return true

        } catch (error) {

            setStatus({
                type: "error",
                message: error.errors
            })

            return false
        }
    }
    return (
        <div className="container">
            <div className="box" />
            <div className="box2">
                <div className="header">
                    <h1>VENDERGÁS</h1>
                    <h3>SISTEMA PARA REVENDAS DE GÁS E ÁGUA</h3>
                    <div className="error-msg">
                    {status.type === 'error' ? <Alert severity="error">{status.message}</Alert> : ""}
                    </div>
                </div>
                <form className="form" onSubmit={ handleSubmit }>

                    <div className="field">
                        {/* name */}
                        <label htmlFor="name">Email</label>
                        <input type="text" name="email" className="inputBox" value={email}  onChange={(e) => {setEmail(e.target.value)}}/>
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
                    <RegistroDialog/>
                </div>
            </div>
        </div>
    )
}

export default Login