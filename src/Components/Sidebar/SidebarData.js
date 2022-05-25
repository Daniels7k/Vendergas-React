import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import InventoryIcon from '@mui/icons-material/Inventory';


export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/" ,
    },
    {
        title: "Empresas",
        icon: <ApartmentIcon />,
        link: "/Empresas" ,
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
    {
        title: "Logout",
        icon: <HomeIcon />,
        link: "/Logout" ,
    }
]