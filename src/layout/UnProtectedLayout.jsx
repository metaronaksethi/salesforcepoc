import React from 'react';
import { Outlet } from 'react-router-dom';
import "./layout.scss";

const UnProtectedLayout = () => {
    console.log("enter here UPLAyout")
    console.log( <Outlet />)
    return (
        <div className='layout'>
        <div className='layoutContainer'>
             <Outlet />
        </div>
        </div>
    );
}

export default UnProtectedLayout;
