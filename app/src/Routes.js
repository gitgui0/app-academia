import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import Content from "./components/Content";
import DefinicoesPage from "./components/DefinicoesPage";

// Define the main routes for the application
export const AppRoutes = () => (
  <Routes>
    {/* The /login route renders the LoginButton component */}
    <Route path="/login" element={<LoginPage />} />
    {/* The root route (/) renders the Dashboard component */}
    <Route
      path="/"
      element={
        <Dashboard>
          <Content />
        </Dashboard>
      }
    />
    <Route
      path="/definicoes"
      element={
        <Dashboard>
          <DefinicoesPage/>
        </Dashboard>
      }
    />
  </Routes>
);
