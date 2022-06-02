import React, { useEffect, useState } from "react";
import AssignmentIcon from '@mui/icons-material/Assignment';
import PageLayout from "../../Components/PageLayout";
import AddDialog from "../../dialogsForm/pedidoDialog/AddDialog"
import InfoDialog from "../../dialogsForm/pedidoDialog/InfoDialog"
import api from "../../services/api";
import "./style.css"

function Pedidos() {
    const empresaName = localStorage.getItem("empresaName")

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
        api.delete(`/pedidos/${pedidoID}/delete`)
    }

    if (loading) {
        return <div><h1>Loading...</h1></div>
    }

    return (
        <PageLayout
            icon={<AssignmentIcon sx={{ fontSize: 60 }} />}
            pageName={`Pedidos das Empresa: ${empresaName}`}
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
                                        />
                                    </div>
                                    <div className=" last pedidos-button" onClick={() => deletarPedido(val._id)}>Excluir</div>
                                </div>
                            </div>
                        )
                    })
                )}


            </div>

        </PageLayout>
    )
}

export default Pedidos