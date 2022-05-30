import React from "react";
import PageLayout from "../../Components/PageLayout"
import InventoryIcon from '@mui/icons-material/Inventory';
import "./style.css"

function Produtos() {
    return (

        <PageLayout
        icon={<InventoryIcon sx={{fontSize: 60}}/>}
        pageName= {"Produtos"}
        addName= {"Produto"}
        classFlex={"flex-row-container"}
        >
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
                    <div className="produto-info button">Excluir</div>

                </div>
                <div className="produto-box">
                    <div className="produto-info">Nome</div>
                    <div className="produto-info">Descrição</div>
                    <div className="produto-info">Empresa</div>
                    <div className="produto-info">Valor</div>
                    <div className="produto-info button">Excluir</div>
                </div>
            </div>
            
        </PageLayout>

    )
}

export default Produtos