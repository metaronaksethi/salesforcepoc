import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedLayout from "../layout/ProtectedLayout";
import CsvImporter from "../pages/csv/CsvImporter";
import Home from "../pages/home/Home";
import Auth from "./Auth";

const SiteRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<ProtectedLayout />}>
           <Route index element={<Home />} />
           <Route path="/auth" element={<Auth />} />
           <Route path="/csv" element={<CsvImporter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default SiteRoutes;
