import React from "react";
import { SidebarData } from "./SidebarData"
import "./style.css"

function Sidebar() {
    return (
        <div className="sidebar-container">
            <div className="sidebar-logo">
                <img src="https://vendergas.com.br/logo.c037bd80.svg" alt="vendergas-logo"/>
            </div>
            <div className="sidebar-user">
            <h2>Bem vindo, Usuário</h2>
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
            </ul>
        </div>
    )
}

export default Sidebar