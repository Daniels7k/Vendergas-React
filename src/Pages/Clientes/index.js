import React, { useState, useEffect } from "react";

import PersonIcon from '@mui/icons-material/Person';
import PageLayout from "../../Components/PageLayout"
import AddDialog from "../../dialogsForm/clienteDialog/AddDialog"
import EditDialog from "../../dialogsForm/clienteDialog/EditDialog"
import api from "../../services/api";

import "./style.css"

function Clientes() {
    const empresaName = localStorage.getItem("empresaName")
    

    const [loading, setLoading] = useState(true)
    const [cliente, setCliente] = useState()

    useEffect(() => {
        const empresaID = localStorage.getItem("empresaID")
        api.post(`/clientes/${empresaID}/index`).then((clientes) => {
            setCliente(clientes.data)
            setLoading(false)
        })
    }, [cliente]);


    const excluirCliente = (clienteID) => {
        api.delete(`/clientes/${clienteID}/delete`).then((response) => {
            console.log(response)
        })
    }

    if (loading) {
        return <div><h1>loading...</h1></div>
    }


    return (
        <PageLayout
            pageName={`Clientes da Empresa: ${empresaName}`}
            addName={"Cliente"}
            icon={<PersonIcon sx={{ fontSize: 60 }} />}
            classFlex={"flex-column-container"}
            header={<AddDialog />}
        >

            {cliente.map((val, key) => {
                return (
                    <div className="cliente-box" key={key}>
                        <div className="icon"><PersonIcon sx={{ fontSize: 79 }} /></div>
                        <h5 className="cliente-info">Nome: {val.nome}</h5>
                        <h5 className="cliente-info">Email: {val.email}</h5>
                        <h5 className="cliente-info">Telefone: {val.telefone}</h5>
                        <h5 className="cliente-info">Empresa: {val.empresa}</h5>
                        <div className="cliente row">
                            <EditDialog
                            clienteID={val._id}
                            edit={"Editar"}
                            nome={val.nome}
                            email={val.email}
                            telefone={val.telefone}
                            empresa={val.empresa}
                            />
                        </div>
                        <div className="cliente row row-excluir" onClick={() => excluirCliente(val._id)}>Excluir</div>
                    </div>
                )
            })}


        </PageLayout>


    )
}

export default Clientes