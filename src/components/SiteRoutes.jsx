import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedLayout from "../layout/ProtectedLayout";
import UnProtectedLayout from "../layout/UnProtectedLayout";
import CsvImporter from "../pages/csv/CsvImporter";
import Home from "../pages/home/Home";
import Auth from "./Auth";

const SiteRoutes = () => {
    console.log("enter here")
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UnProtectedLayout />}>
          <Route path="login" element={<Home />} />
        </Route>
       <Route path="/" element={<ProtectedLayout />}>
           <Route index element={<Home />} />
           <Route path="/auth" element={<Auth />} />
           <Route path="/csv" element={<CsvImporter />} />
          {/* <Route path="users">
            <Route index element={<List />} />
            <Route path=":userId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add New User" />}
            />
          </Route>  */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default SiteRoutes;
