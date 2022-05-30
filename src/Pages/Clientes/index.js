import React from "react";

import PersonIcon from '@mui/icons-material/Person';
import PageLayout from "../../Components/PageLayout"

import "./style.css"

function Clientes() {
    return (
        <PageLayout
        pageName= {"Clientes"}
        addName= {"Cliente"}
        icon={ <PersonIcon sx={{fontSize: 60}}/>}
        classFlex={"flex-column-container"}
        >
                <div className="cliente-box">
                    <div className="icon"><PersonIcon sx={{ fontSize: 79 }} /></div>
                    <h5 className="cliente-info">Nome: Eduardo Pereira</h5>
                    <h5 className="cliente-info">Email: Edu@gmail.com</h5>
                    <h5 className="cliente-info">Telefone: 61 9999-9999</h5>
                    <h5 className="cliente-info">Empresa: Edu Lanches</h5>
                    <div className="cliente row">Dados</div>
                    <div className="cliente row">Editar</div>
                    <div className="cliente row row-excluir">Excluir</div>
                </div>

        </PageLayout>


    )
}

export default Clientes