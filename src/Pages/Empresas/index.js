import React, { useEffect, useState } from "react";
import ApartmentIcon from '@mui/icons-material/Apartment';
import PageLayout from "../../Components/PageLayout";
import api from "../../services/api"
import AddDialog from "../../dialogsForm/empresaDialog/addDialog"
import EditDialog from "../../dialogsForm/empresaDialog/editDialog"
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import "./style.css"


function Empresas() {
    const userID = localStorage.getItem("userID")
    const [empresas, setEmpresas] = useState()
    const [loading, setLoading] = useState(true)
    const [snackOpen, setSnackOpen] = useState(false)

    useEffect(() => {
        const userID = localStorage.getItem("userID")
        api.post(`empresas/${userID}/index`).then((response) => {
            setEmpresas(response.data)
            setLoading(false)
        })
    }, [empresas])

    const excluirEmpresa = (empresaID) => {
        api.delete(`/empresas/${userID}/${empresaID}/delete`).then(() => {
            setSnackOpen(true)
        })

        localStorage.removeItem("empresaName")
    }

    const handleClose = () => {
        setSnackOpen(false)
    }

    const getEmpresaNameAndID = (empresaID, empresaName) => {
        localStorage.setItem("empresaID", empresaID)
        localStorage.setItem("empresaName", empresaName)
        console.log("gerenciando empresa", empresaID)
    }

    if (loading) {
        return <div><h1>Loading...</h1></div>
    }
    return (
        <PageLayout
            pageName={"Empresas"}
            icon={<ApartmentIcon sx={{ fontSize: 60 }} />}
            classFlex={"flex-column-container"}
            addName={"Empresa"}
            header={<AddDialog userID={userID} />}
        >

            {empresas.map((val, key) => {
                return (
                    < div className="empresas-box" key={key}>
                        <div className="icon"><ApartmentIcon sx={{ fontSize: 79 }} /></div>
                        <h5 className="empresa-info">Nome Fantasia: {val.nomeFantasia}</h5>
                        <h5 className="empresa-info">Raz??o Social: {val.razaoSocial}</h5>
                        <h5 className="empresa-info">CNPJ: {val.cnpj}</h5>
                        <div className="row" onClick={() => getEmpresaNameAndID(val._id, val.nomeFantasia)} >Gerenciar</div>
                        <div className="row">
                            <EditDialog
                                name={"Editar"}
                                userID={userID}
                                empresaID={val._id}
                                razaoSocial={val.razaoSocial}
                                nomeFantasia={val.nomeFantasia}
                                cnpj={val.cnpj}
                            />
                        </div>
                        <div className="row row-excluir" onClick={() => excluirEmpresa(val._id)}>Excluir</div>
                    </div >
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

export default Empresas

