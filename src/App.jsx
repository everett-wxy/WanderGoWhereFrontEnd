import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Planboard from "./components/Planboard/Planboard";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/planboard" element={<Planboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
