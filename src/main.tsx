import "tailwindcss/tailwind.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { DashboardLayout } from "./dashboard/Layout";
import './global.css';
import Api from "./api/Api.ts";

(window as any)["api"] = new Api("http://localhost:8080");
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <DashboardLayout>
        <App/>
      </DashboardLayout>
    </Router>
    ,
  </React.StrictMode>
);
