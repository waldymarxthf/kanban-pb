import "@mantine/core/styles.css";
import App from "~pages/home";
import Dashboard from "~pages/dashboard";
import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider>
      {/* <App /> */}
      <Dashboard />
    </MantineProvider>
  </React.StrictMode>,
);
