import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RegistroPage from "./pages/RegistroPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<RegistroPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}