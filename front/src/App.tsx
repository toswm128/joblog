import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "pages/MainPage";
import LoginPage from "pages/Auth/LoginPage";
import DetailPage from "pages/Board/DetailPage";
import JoinPage from "pages/Auth/JoinPage";
import WritePage from "pages/Board/WritePage";

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
