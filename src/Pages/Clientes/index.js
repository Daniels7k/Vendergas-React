import React, { useState, useEffect } from "react";

import PersonIcon from '@mui/icons-material/Person';
import PageLayout from "../../Components/PageLayout"
import AddDialog from "../../dialogsForm/clienteDialog/AddDialog"
import EditDialog from "../../dialogsForm/clienteDialog/EditDialog"
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import api from "../../services/api";

import "./style.css"

function Clientes() {
    const empresaName = localStorage.getItem("empresaName")

    const [snackOpen, setSnackOpen] = useState(false)
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
        api.delete(`/clientes/${clienteID}/delete`).then(() => {
            setSnackOpen(true)
        })
    }

    const handleClose = () => {
        setSnackOpen(false)
    }

    if (loading) {
        return <div><h1>loading...</h1></div>
    }


    return (
        <PageLayout
            pageName={`Clientes da Empresa: ${ empresaName? (empresaName) : ("Nenhuma empresa selecionada!") }`}
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

            <Snackbar open={snackOpen} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity="error" sx={{ width: '100%', marginRight: 4, marginTop: 1 }}>
                    Excluido com sucesso!
                </Alert>
            </Snackbar>

        </PageLayout>


    )
}

export default Clientes