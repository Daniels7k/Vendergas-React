import React, { useEffect, useState } from "react";
import PageLayout from "../../Components/PageLayout"
import InventoryIcon from '@mui/icons-material/Inventory';
import AddDialog from "../../dialogsForm/produtoDialog/AddDialog"
import EditDialog from "../../dialogsForm/produtoDialog/EditDialog"
import api from "../../services/api"
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import "./style.css"

function Produtos() {
    const empresaName = localStorage.getItem("empresaName")
    const [snackOpen, setSnackOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [produto, setProduto] = useState()


    useEffect(() => {
        const empresaID = localStorage.getItem("empresaID")
        api.post(`/produtos/${empresaID}/index`).then((response) => {
            setProduto(response.data)
            setLoading(false)
        })

    }, [produto])

    const excluirProduto = (produtoID) => {
        api.delete(`/produtos/${produtoID}/delete`).then(() => {
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
            icon={<InventoryIcon sx={{ fontSize: 60 }} />}
            pageName={`Produtos da Empresa: ${empresaName? (empresaName) : ("Nenhuma empresa selecionada!")}`}
            addName={"Produto"}
            classFlex={"flex-row-container"}
            header={<AddDialog />}
        >

            <div className="produto-container">
                <div className="produto-box">
                    <div className="produto-info-header">Nome</div>
                    <div className="produto-info-header">Descrição</div>
                    <div className="produto-info-header">Empresa</div>
                    <div className="produto-info-header">Valor</div>
                    <div className="produto-info-header">Ações</div>
                </div>

                {produto.map((val, key) => {

                    return (<div className="produto-box" key={key}>

                        <div className="produto-info">{val.nome}</div>
                        <div className="produto-info">{val.descricao}</div>
                        <div className="produto-info">{val.empresa}</div>
                        <div className="produto-info">R$ {val.valor}</div>
                        <div className="produto-actions" >
                            <div className="produto-info button">
                                <EditDialog
                                nome={val.nome}
                                descricao={val.descricao}
                                empresa={val.empresa}
                                valor={val.valor}
                                produtoID={val._id}
                                />
                                </div>
                            <div id="excluir" className="produto-info button" onClick={() => excluirProduto(val._id)} >Excluir</div>
                            </div>

                    </div>)
                })}

            </div>

            <Snackbar open={snackOpen} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity="error" sx={{ width: '100%', marginRight: 4, marginTop: 1 }}>
                    Excluido com sucesso!
                </Alert>
            </Snackbar>

        </PageLayout>


    )
}

export default Produtos