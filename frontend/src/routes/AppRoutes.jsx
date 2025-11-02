import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Simulados from '../pages/Simulados';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Simulados" element={<Simulados />} />
      </Routes>
    </BrowserRouter>
  );
}