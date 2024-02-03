// Importa as bibliotecas e componentes necessários
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react'; // SDK(software development kit) do Auth0 para React
import App from './App';

// Cria uma raiz React no nó DOM com o id 'root'
const root = createRoot(document.getElementById('root'));

// Renderizar a app React no nó DOM( Document Object Model ) raiz
root.render(
    <App /> 
);

