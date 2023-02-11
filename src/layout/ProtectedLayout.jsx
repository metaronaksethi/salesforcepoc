import React from "react";
import { Outlet } from "react-router-dom";
import "./layout.scss";

const ProtectedLayout = () => {
  console.log("Protected Layout");
  console.log( <Outlet />);
  return (
    <div className="layout">
      <div className="layoutContainer">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
