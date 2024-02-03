import json
from urllib.request import urlopen

from authlib.oauth2.rfc7523 import JWTBearerTokenValidator
from authlib.jose.rfc7517.jwk import JsonWebKey

# Definição de uma classe de validação de token JWT para Auth0
class Auth0JWTBearerTokenValidator(JWTBearerTokenValidator):
    def __init__(self, domain, audience):
        # Construção da URL do emissor (issuer) com base no domínio do Auth0
        issuer = f"https://{domain}/"
        
        print(f"{issuer}.well-known/jwks.json")
        # Requisição para obter as chaves públicas JSON Web Key Set (jwks.json) do Auth0
        jsonurl = urlopen(f"{issuer}.well-known/jwks.json")
        
        # Importação do conjunto de chaves públicas como instância de JsonWebKey
        public_key = JsonWebKey.import_key_set(
            json.loads(jsonurl.read())
        )
        
        # Chamada ao construtor da classe pai, passando a chave pública como argumento
        super(Auth0JWTBearerTokenValidator, self).__init__(
            public_key
        )
        
        # Configuração de opções de reivindicação para garantir a validação adequada do token
        self.claims_options = {
            "exp": {"essential": True},     # Tempo de expiração essencial
            "aud": {"essential": True, "value": audience},  # Audiência essencial com valor específico
            "iss": {"essential": True, "value": issuer},    # Emissor essencial com valor específico
        }
