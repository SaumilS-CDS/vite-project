import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "./Core/Auth.tsx";
import { AuthRoute } from "./Core/AuthRoute.tsx";
import { Login } from "./Login/Login.tsx";
import { Registration } from "./Registration/Registration.tsx";
import { Book } from "./Core/Book.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth>
        <Book>
          <Routes>
            <Route element={<AuthRoute />}>
              <Route path="*" element={<App />} />
            </Route>
            <Route>
              <Route path="signup" element={<Registration />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </Book>
      </Auth>
    </BrowserRouter>
  </React.StrictMode>
);
