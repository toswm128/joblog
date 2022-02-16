import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "pages/MainPage";
import LoginPage from "pages/LoginPage";
import DetailPage from "pages/DetailPage";
import JoinPage from "pages/JoinPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="join" element={<JoinPage />} />
      </Routes>
    </Router>
  );
}

export default App;
