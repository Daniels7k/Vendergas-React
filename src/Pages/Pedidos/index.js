import React, { useEffect, useState } from "react";
import AssignmentIcon from '@mui/icons-material/Assignment';
import PageLayout from "../../Components/PageLayout";
import AddDialog from "../../dialogsForm/pedidoDialog/AddDialog"
import InfoDialog from "../../dialogsForm/pedidoDialog/InfoDialog"
import api from "../../services/api";
import "./style.css"
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

function Pedidos() {
    const empresaName = localStorage.getItem("empresaName")

    const [snackOpen, setSnackOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [pedidos, setPedidos] = useState()

    useEffect(() => {
        const empresaID = localStorage.getItem("empresaID")
        api.post(`/pedidos/${empresaID}/index`).then((response) => {
            setPedidos(response.data)
            setLoading(false)
        })
    }, [pedidos])


    const deletarPedido = (pedidoID) => {
        api.delete(`/pedidos/${pedidoID}/delete`).then(() => {
            setSnackOpen(true)
        })
    }

    const handleClose = () => {
        setSnackOpen(false)
    }


    if (loading) {
        return <div><h1>Loading...</h1></div>
    }

    return (
        <PageLayout
            icon={<AssignmentIcon sx={{ fontSize: 60 }} />}
            pageName={`Pedidos das Empresa: ${empresaName? (empresaName) : ("Nenhuma empresa selecionada!")}`}
            addName={"Pedidos"}
            classFlex={"flex-row-container"}
            header={<AddDialog />}
        >
            <div className="pedidos-container">

                <div className="pedidos-grid">
                    <div className="pedidos-info-header">Pedido</div>
                    <div className="pedidos-info-header">Cliente</div>
                    <div className="pedidos-info-header">Empresa Reponsável</div>
                    {/* <div className="pedidos-info-header">Status Pedido</div> */}
                    <div className="pedidos-info-header">Data P/ Entrega</div>
                    <div className=" last pedidos-info-header ">Ações</div>
                </div>

                {pedidos && (
                    pedidos.map((val, key) => {
                        return (
                            <div className="pedidos-grid" key={key}>
                                <div className="pedidos-info"><strong>{val.numeroPedido}</strong></div>
                                <div className="pedidos-info">{val.cliente}</div>
                                <div className="pedidos-info">{val.empresa}</div>
                                {/* <div className="pedidos-info pedidos-status">Pendente</div> */}
                                <div className="pedidos-info">{val.data}</div>

                                <div className="pedidos-info pedidos-acoes ">
                                    <div className="pedidos-button ">
                                        <InfoDialog
                                            produto={val.produto}
                                            quantidade={val.quantidadeProduto}
                                            observacao={val.observacao}
                                        />
                                    </div>
                                    <div className=" last pedidos-button" onClick={() => deletarPedido(val._id)}>Excluir</div>
                                </div>
                            </div>
                        )
                    })
                )}


            </div>
            <Snackbar open={snackOpen} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity="error" sx={{ width: '100%', marginRight: 4, marginTop: 1 }}>
                    Excluido com sucesso!
                </Alert>
            </Snackbar>
        </PageLayout>

        
    )
}

export default Pedidos