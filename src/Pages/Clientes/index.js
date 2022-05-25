import React from "react";
import Sidebar from "../../Components/Sidebar"
import PersonIcon from '@mui/icons-material/Person';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ClienteDialog from "../../Components/FormDialog/ClienteDialog"

import "./style.css"

function Clientes() {
    return (
        <div className="cliente-flex">
            <Sidebar />
            <div className="cliente-background">
                <div className="cliente-header">
                    <PersonIcon sx={{ fontSize: 60 }} />
                    <h1>Clientes</h1>
                </div>

                <div className="cliente-container-background">

                    <ClienteDialog nomeDoFormulario={"Adicionar Cliente"} nome={
                        <div className="cliente-container-header">
                            <AddBoxIcon sx={{ fontSize: 60 }} />
                            <h1>Adicionar Cliente</h1>
                        </div>
                    } />
                    <div className="cliente-container">
                        <div className="cliente-box">
                            <div className="icon"><PersonIcon sx={{ fontSize: 79 }} /></div>
                            <h5 className="cliente-info">Nome: Eduardo Pereira</h5>
                            <h5 className="cliente-info">Email: Edu@gmail.com</h5>
                            <h5 className="cliente-info">Telefone: 61 9999-9999</h5>
                            <h5 className="cliente-info">Empresa: Edu Lanches</h5>
                            <div className="cliente row">Dados</div>
                            <div className="cliente row"><ClienteDialog nome={"Editar"} nomeDoFormulario={"Editar Cliente"} /></div>
                            <div className="cliente row row-excluir">Excluir</div>
                        </div>

                    </div>
                </div>


            </div>
        </div>

    )
}

export default Clientes