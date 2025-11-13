import { Navigate, Outlet, useLocation } from "react-router-dom";
import { validarToken } from "../services/authService";
import { useEffect, useState } from "react";

export function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  
  useEffect(() => { 
    const validar = () => {
      setIsLoading(true);
      validarToken().then((res)=> {
        if(res === true){
          setIsAuthenticated(true);
          setIsLoading(false);
        }
        else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      })
    }
    validar();
  }, [location.pathname])

  if(isLoading){
    return (
      <div style={{display:"flex", justifyContent:"center", alignItems: "center"}}>
        <p>Carregando...</p>
      </div>
    )
  }
  return isAuthenticated === true ? <Outlet /> : <Navigate to="/login" replace />;
}