import React from "react";
import Sidebar from "../../Components/Sidebar"
import ApartmentIcon from '@mui/icons-material/Apartment';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FormDialog from "../../Components/FormDialog";

import "./style.css"

function Empresas() {
    return (
        <div className="empresas-flex">
            <Sidebar />
            <div className="empresas-background">
                <div className="empresas-header">
                    <ApartmentIcon sx={{ fontSize: 60 }} />
                    <h1>Empresas</h1>
                </div>

                <div className="empresas-container-background">

                    <FormDialog nome={
                        <div className="empresas-container-header">
                            <AddBoxIcon sx={{ fontSize: 60 }} />
                            <h1>Adicionar Empresa</h1>
                        </div>
                    } />
                    <div className="empresas-container">
                        <div className="empresas-box">
                            <div className="icon"><ApartmentIcon sx={{ fontSize: 79 }} /></div>
                            <h5 className="empresa-info">Nome Fantasia: Eduardo Pereira</h5>
                            <h5 className="empresa-info">Razão Social: Edu Lanches</h5>
                            <h5 className="empresa-info">CNPJ: XX. XXX. XXX/0001-XX</h5>
                            <div className="row">Dados</div>
                            <div className="row"><FormDialog nome={"Editar"} /></div>
                            <div className="row row-excluir">Excluir</div>
                        </div>

                    </div>
                </div>


            </div>
        </div>

    )
}

export default Empresas