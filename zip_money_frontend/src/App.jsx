import Login from "./views/Login";
import React from "react";
import Register from "./views/Register";
import AboutUs from "./layouts/AboutUs";
import Features from "./layouts/Features";
import Home from "./views/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./views/Dashboard";
import ApolloProvider from "./providers/AuthProviders";

function App() {
  return (
    <ApolloProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/app-features" element={<Features />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
    </ApolloProvider>
  );
}

export default App;
