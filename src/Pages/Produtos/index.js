import React from "react";
import Sidebar from "../../Components/Sidebar"
import AddBoxIcon from '@mui/icons-material/AddBox';
import ProdutoDialog from "../../Components/FormDialog/ProdutoDialog";
import InventoryIcon from '@mui/icons-material/Inventory';
import "./style.css"

function Produtos() {
    return (
        <div className="produto-flex">
            <Sidebar />
            <div className="produto-background">
                <div className="produto-header">
                    <InventoryIcon sx={{ fontSize: 60 }} />
                    <h1>Produtos</h1>
                </div>

                <div className="produto-container-background">

                    <ProdutoDialog nomeDoFormulario={"Adicionar Produto"} nome={
                        <div className="produto-container-header">
                            <AddBoxIcon sx={{ fontSize: 60 }} />
                            <h1>Adicionar produto</h1>
                        </div>
                    } />
                    <div className="produto-container">
                        <div className="produto-box">
                            <div className="produto-info-header">Nome</div>
                            <div className="produto-info-header">Descrição</div>
                            <div className="produto-info-header">Empresa</div>
                            <div className="produto-info-header">Valor</div>
                            <div className="produto-info-header">Ações</div>
                        </div>
                        <div className="produto-box">
                            <div className="produto-info">Hamburguer</div>
                            <div className="produto-info">Hamburguer de pão e ovo</div>
                            <div className="produto-info">Edu Lanches</div>
                            <div className="produto-info">R$ 15,00</div>
                            <div className="produto-info button"><ProdutoDialog nome={"Editar/Excluir"} nomeDoFormulario={"Editar Produto"}/></div>
                            
                        </div>
                        <div className="produto-box">
                            <div className="produto-info">Nome</div>
                            <div className="produto-info">Descrição</div>
                            <div className="produto-info">Empresa</div>
                            <div className="produto-info">Valor</div>
                            <div className="produto-info button"><ProdutoDialog nome={"Editar/Excluir"} nomeDoFormulario={"Editar Produto"}/></div>
                        </div>
                    </div>

                </div>


            </div>
        </div>

    )
}

export default Produtos