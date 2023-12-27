import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./Components/Header/Header";
import { Dashboard } from "./Dashboard/Dashboard";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
