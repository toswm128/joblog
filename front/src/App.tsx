import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "pages/Blog/MainPage";
import LoginPage from "pages/Auth/LoginPage";
import BoardPage from "pages/Blog/BoardPage";
import JoinPage from "pages/Auth/JoinPage";
import WritePage from "pages/Blog/WritePage";
import Header from "components/common/header";

function App() {
  return (
    <Router>
      <Header>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/board/:idx" element={<BoardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/write" element={<WritePage />} />
        </Routes>
      </Header>
    </Router>
  );
}

export default App;
