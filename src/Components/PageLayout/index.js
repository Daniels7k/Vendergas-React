import React from "react";
import Sidebar from "../../Components/Sidebar"
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

                    {props.header}

                    <div className={props.classFlex}>
                        {props.children}
                    </div>

                </div>
            </div>
        </div>

    )
}

export default PageLayout