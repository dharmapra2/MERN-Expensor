import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from "./Components/AppBar";
import Register from "./Components/Register";
import Home from "./Widget/Home";
import LoginPage from "./Widget/LoginPage";
import CheckAuth from "./Routes/CheckAuth";

function App() {
  return (
    <>
      <Router>
        <AppBar />
        <Routes>
          <Route
            path="/"
            element={
              <CheckAuth>
                <Home />
              </CheckAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
