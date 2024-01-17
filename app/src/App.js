
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./Routes";
import './index.css';

// Definir o componente principal App
function App() {
  return (
    // Usar o componente Router para ativar o roteamento
    <Router>
      {/* Usa o componente AppRoutes que define as rotas da aplicação */}
      <AppRoutes />
    </Router>
  );
}

// Exporta o componente App como exportação padrão
export default App;