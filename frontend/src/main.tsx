// import React from 'react'
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "@/assets/css/main.css";
import "@/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/i18n/i18n.ts"
import { ScrollProvider } from "./contexts/ScrollContext.tsx";
import { AlertProvider } from "./contexts/AlertContext.tsx";
import { CollapseProvider } from "./contexts/CollapseNavbar.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ScrollProvider>
    <AlertProvider>
      <BrowserRouter>
        <CollapseProvider>
          <App />
        </CollapseProvider>
      </BrowserRouter>
    </AlertProvider>
   </ScrollProvider>
);
