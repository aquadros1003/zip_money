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
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppLayout from "./layouts/AppLayout";
import Budget from "./views/Budget";
import UpdateProfile from "./views/UpdateProfile";
import CreateBudgetForm from "./components/CreateBudgetForm";

function App() {
  return (
    <GoogleOAuthProvider clientId="1001451999192-dujckipt0v8f3g7lm2peuufa2d51j0ch.apps.googleusercontent.com">
      <ApolloProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/app-features" element={<Features />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<AppLayout />}>
              <Route path="/dashboard/" element={<Dashboard />} />
              <Route path="/dashboard/budget" element={<Budget />} />
              <Route
                path="/dashboard/create-budget"
                element={<CreateBudgetForm />}
              />
              <Route
                path="/dashboard/update-profile"
                element={<UpdateProfile />}
              />
            </Route>
          </Routes>
        </Router>
      </ApolloProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
