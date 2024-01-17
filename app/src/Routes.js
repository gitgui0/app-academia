import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import Dashboard from "./components/Dashboard";

// Definir um componente ProtectedRoute
// Este componente verifica se o utilizador está autenticado antes de renderizar seus filhos
export const ProtectedRoute = ({ children }) => {
  // Obtém as propriedades necessárias do contexto Auth0
  // isAuthenticated: indica se o utilizador está autenticado
  // isLoading: indica se o SDK Auth0 está a carregar o estado de autenticação
  // loginWithRedirect: função para redirecionar o utilizador para a página de login
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  
  // Redirecionar para a página de login se o usuário não estiver autenticado
  React.useEffect(() => {
    // Se o utilizador não estiver autenticado e não estiver a carregar, redirecionar para a página de login
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();// Redirecionar para a página de login
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);// Dependências do efeito React

  // Renderiza os filhos se o usuário estiver autenticado e não estiver carregando
  // Caso contrário, não renderiza nada
  return isAuthenticated && !isLoading ? children : null;
};

// Define as rotas principais para a aplicação
export const AppRoutes = () => (
  <Routes>
     {/* A rota /login renderiza o componente LoginButton */}
    <Route path="/login" element={<LoginButton />} />
    {/* // A rota raiz (/) renderiza o componente Dashboard dentro de um ProtectedRoute */}
    {/* // Significa que o utilizador deve estar autenticado para ver o Dashboard */}
    <Route path="/" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
  </Routes>
);