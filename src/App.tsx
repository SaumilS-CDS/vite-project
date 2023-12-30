import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./Core/AuthContext";

import "./App.css";

import { Header } from "./Components/Header/Header";
import { Dashboard } from "./Dashboard/Dashboard";
import { NotFound } from "./NotFound/NotFound";
import { BookDetail } from "./BookDetail/BookDetail";
import { About } from "./About/About";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
};

export default App;
