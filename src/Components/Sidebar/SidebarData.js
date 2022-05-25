import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';


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
        title: "Logout",
        icon: <HomeIcon />,
        link: "/Logout" ,
    }
]