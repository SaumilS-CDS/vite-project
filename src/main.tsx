import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "./Core/Auth.tsx";
import { AuthRoute } from "./Core/AuthRoute.tsx";
import { Login } from "./Login/Login.tsx";
import { Registration } from "./Registration/Registration.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="*" element={<App />} />
          </Route>
          <Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Registration />} />
          </Route>
        </Routes>
      </Auth>
    </BrowserRouter>
  </React.StrictMode>
);
