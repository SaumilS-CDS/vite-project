import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./Components/Header/Header";
import { Dashboard } from "./Dashboard/Dashboard";
import { Login } from "./Login/Login";
import { Registration } from "./Registration/Registration";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
