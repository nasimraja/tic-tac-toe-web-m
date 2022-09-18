import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

const Privateroute =()=>{
    const auth = localStorage.getItem('users');
    return auth?<Outlet />:<Navigate to="/" />
}


export default Privateroute;