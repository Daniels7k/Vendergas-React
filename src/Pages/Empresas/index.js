import React from "react";
import ApartmentIcon from '@mui/icons-material/Apartment';
import PageLayout from "../../Components/PageLayout";

import "./style.css"

function Empresas() {
    return (
        <PageLayout
            pageName={"Empresas"}
            addName={"Empresa"}
            icon={<ApartmentIcon sx={{ fontSize: 60 }} />}
            classFlex={"flex-column-container"}
        >


            < div className="empresas-box" >
                <div className="icon"><ApartmentIcon sx={{ fontSize: 79 }} /></div>
                <h5 className="empresa-info">Nome Fantasia: Eduardo Pereira</h5>
                <h5 className="empresa-info">Razão Social: Edu Lanches</h5>
                <h5 className="empresa-info">CNPJ: XX. XXX. XXX/0001-XX</h5>
                <div className="row">Dados</div>
                <div className="row">Editar</div>
                <div className="row row-excluir">Excluir</div>
            </div >


        </PageLayout>

    )
}

export default Empresas

