import React from "react";
import ApartmentIcon from '@mui/icons-material/Apartment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InventoryIcon from '@mui/icons-material/Inventory';


export const SidebarData = [
    {
        title: "Pedidos",
        icon: <AssignmentIcon />,
        link: "/pedidos" ,
    },
    {
        title: "Empresas",
        icon: <ApartmentIcon />,
        link: "/empresas" ,
    },
    {
        title: "Produtos",
        icon: <InventoryIcon />,
        link: "/produtos" ,
    },
    {
        title: "Clientes",
        icon: <ApartmentIcon />,
        link: "/clientes" ,
    },
]