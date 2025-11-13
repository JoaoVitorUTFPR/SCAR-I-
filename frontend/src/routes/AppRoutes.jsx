import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Simulados from '../pages/Simulados';
import Avaliacao from '../pages/Avaliacao';
import { Login } from '../pages/Login';
import { Registro } from '../pages/Registro';
import { ProtectedRoute } from './ProtectedRoute';
import Relatorio from '../pages/Relatorio';
import { Download } from '../pages/Download';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registrar" element={<Registro/>}></Route>
        <Route path="/login" element={<Login />} />
l        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Home />} />
          <Route path="/download" element={<Download />} />
          <Route path="/simulados" element={<Simulados />} />
          <Route path="/relatorio/:usuarioSimuladoId" element={<Relatorio />} />
          <Route path="/avaliacao/:simuladoId" element={<Avaliacao />} />
          <Route path="/avaliacao" element={<Avaliacao />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}