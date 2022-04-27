import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "pages/MainPage";
import LoginPage from "pages/LoginPage";
import DetailPage from "pages/DetailPage";
import JoinPage from "pages/JoinPage";
import WritePage from "pages/WritePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail/:idx" element={<DetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/write" element={<WritePage />} />
      </Routes>
    </Router>
  );
}

export default App;
