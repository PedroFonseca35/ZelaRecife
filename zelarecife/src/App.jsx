import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RegistroPage from "./pages/RegistroPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<RegistroPage />} />
        <Route path="/admin" element={<p>Painel em construção.</p>} />
      </Route>
    </Routes>
  );
}