import React, { useContext } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from "../../contexts/AuthContext";
import { SidebarData } from "./SidebarData"
import "./style.css"

function Sidebar() {
    const userName = localStorage.getItem("userName")
    const empresaName = localStorage.getItem("empresaName")


    const { handleLogout } = useContext(AuthContext)

    return (
        <>
            <div className="sidebar-container">
                <div className="sidebar-logo">
                    <img src="https://vendergas.com.br/logo.c037bd80.svg" alt="vendergas-logo" />
                </div>
                <div className="sidebar-user">
                    <div className="sidebar-name">Bem vindo, <strong>{userName.toUpperCase()}</strong></div>
                    {!empresaName&&(
                        <div className="sidebar" > Selecione uma empresa para gerenciar</div>
                    )}
                    {empresaName && (
                        <div className="sidebar-empresa">Você esta gerenciando a empresa:<br /> <strong>{empresaName.toUpperCase()}</strong></div>
                    )}
                </div>

                <ul className="sidebar-list">
                    {SidebarData.map((val, key) => {
                        return (
                          
                                <li key={key} onClick={() => { window.location.pathname = val.link }} className="sidebar-row" id={window.location.pathname === val.link ? "active" : ""}>
                                    <div id="icon">{val.icon}</div>
                                    <div id="title">{val.title}</div>
                                </li>
                           
                        )
                    })}

                    <li className="sidebar-row" onClick={handleLogout}>
                        <div id="icon"><LogoutIcon/></div>
                        <div id="title">Logout</div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar