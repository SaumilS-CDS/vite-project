import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./Components/Header/Header";
import { Dashboard } from "./Dashboard/Dashboard";
import { NotFound } from "./NotFound/NotFound";
import { Login } from "./Login/Login";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<Login />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
};

export default App;
