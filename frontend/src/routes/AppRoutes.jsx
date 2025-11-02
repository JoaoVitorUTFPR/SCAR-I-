import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Simulados from '../pages/Simulados';
import Avaliacao from '../pages/Avaliacao';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Simulados" element={<Simulados />} />
        <Route path="/Avaliacao/:simuladoId" element={<Avaliacao />} />
      </Routes>
    </BrowserRouter>
  );
}