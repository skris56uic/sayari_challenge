import React from "react";
import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import PostDetail from "./components/PostDetail";
import UserDetail from "./components/UserDetail";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
