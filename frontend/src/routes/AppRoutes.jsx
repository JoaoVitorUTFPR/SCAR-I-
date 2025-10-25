import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Avaliacao from '../pages/Avaliacao';
import Simulados from '../pages/Simulados';
import Dowload  from '../pages/Download';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Avaliacao" element={<Avaliacao/>} />
        <Route path="/Simulados" element={<Simualados />} />
        <Route path="/Download" element={<Dowload />} />
      </Routes>
    </BrowserRouter>
  );
}