import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Simulados from '../pages/Simulados';
import Avaliacao from '../pages/Avaliacao';
import { Login } from '../pages/Login';
import { Registro } from '../pages/Registro';
import { ProtectedRoute } from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registrar" element={<Registro/>}></Route>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Home />} />
          <Route path="/simulados" element={<Simulados />} />
          <Route path="/avaliacao/:simuladoId" element={<Avaliacao />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}