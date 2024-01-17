// Importa as bibliotecas e componentes necessários
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react'; // SDK(software development kit) do Auth0 para React
import App from './App';

// Cria uma raiz React no nó DOM com o id 'root'
const root = createRoot(document.getElementById('root'));

// Renderizar a app React no nó DOM( Document Object Model ) raiz
root.render(
  // Envolver o componente App com o componente Auth0Provider para configurar o contexto do Auth0 para a aplicação toda
  // Isso configura o contexto do Auth0 para todo o aplicativo
  <Auth0Provider
    // Definir o domínio e o id( credencial ) do cliente do Auth0 a partir das variáveis de ambiente
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    // Definir o URL que o Auth0 irá rederecionar se o utilizador fizer login com sucesso, neste caso, o URL da origem da aplicação
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />  {/* Componente da aplicação */}
  </Auth0Provider>
);

