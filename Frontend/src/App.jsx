import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import Skills from "./Components/Skills";
import AboutYourself from "./Components/AboutYourself";
import UserJobExperience from "./Components/UserJobExperience";
import MarketPlace from "./Components/MarketPlace";
import Findwork from "./Components/FindWork";
import UserExperience from "./Components/ProjectRequest";
import ProjectRequest from "./Components/ProjectRequest";

function App() {
  axios.defaults.withCredentials = true;
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/skills" element={<Skills />}></Route>
        <Route path="/registration" element={<RegisterPage />}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/aboutyourself" element={<AboutYourself />} />
        <Route path="/jobexperience" element={<UserJobExperience />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/findwork" element={<Findwork />} />
        <Route path="/projectrequest" element={<ProjectRequest/>}/>
      </Routes>
    </Router>
  );
}

export default App;