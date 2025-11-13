import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  //Adicionar StrictMode melhora debug mas causa o useEffect ser chamado duas vezes<StrictMode>
  <App />
  //</StrictMode>,
)
