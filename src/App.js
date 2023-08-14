import * as React from "react";
import HomePage from "./page/Homepage";
import DetailPage from "./page/Detailpage";
import "./App.css";
import "./style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/video/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
