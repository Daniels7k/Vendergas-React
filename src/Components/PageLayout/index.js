import React from "react";
import Sidebar from "../../Components/Sidebar"
import AddBoxIcon from '@mui/icons-material/AddBox';
import "./style.css"

function PageLayout(props) {
    return (
        <div className="empresas-flex">
            <Sidebar />
            <div className="empresas-background">
                <div className="empresas-header">
                    {props.icon}
                    <h1>{props.pageName}</h1>
                </div>

                <div className="empresas-container-background">

                    <div className="empresas-container-header">
                        <AddBoxIcon sx={{ fontSize: 60 }} />
                        <h1>Adicionar {props.addName}</h1>
                    </div>

                    <div className={props.classFlex}>
                        {props.children}
                    </div>

                </div>
            </div>
        </div>

    )
}

export default PageLayout