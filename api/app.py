
from datetime import datetime
import os

from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from dotenv import load_dotenv

from authlib.integrations.flask_oauth2 import ResourceProtector
from validator import Auth0JWTBearerTokenValidator

import requests
from requests.auth import HTTPBasicAuth



APP = Flask(__name__) # Cria uma nova instância da aplicação Flask.
CORS(APP, origins=['http://localhost:3000']) # Apenas o endereço de produção

load_dotenv() # Carregar variáveis de ambiente do arquivo .env.
APP.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:admin@localhost/app-academia" # Variável de Ambiente URL da BD
db = SQLAlchemy(APP) # inicializar uma instância da BD SQLAlchemy para a app.

from sqlalchemy.dialects.postgresql import ARRAY
# Definir modelo para Atividades
class Atividade(db.Model):
    id = db.Column(db.Integer, primary_key=True)# ID único da atividade
    name = db.Column(db.String(255), nullable=False)# Nome da Atividade
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow) # Data e Hora, valor padrão: agora
    n_participants = db.Column(db.Integer, default=0)# Numero de participantes
    created_at = db.Column(db.DateTime, default=datetime.utcnow)# Data e hora da criação do evento
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow) # Data e hora da última atualização do evento
    valid_ids = db.Column(ARRAY(db.String(255)), nullable=True) # Lista de ids de pessoas que tem acesso a atividade
    
    def __repr__(self): #representação do objeto em string
        return f"""
        Id: {self.id}
        Nome: {self.name}
        Date: {self.date}
        N of Participants: {self.n_participants}
        Created_at: {self.created_at}
        Updated_At: {self.updated_at}
        """

    def __init__(self, name, valid_ids=None):# Inicialização do objeto
        self.name = name
        self.valid_ids = valid_ids

def format_atividade(atividade): #Formatação do objeto para depois ser enviado em JSON 
    return {
        "id": atividade.id,
        "name": atividade.name,
        "date": atividade.date,
        "n_participants": atividade.n_participants
    
    }


# Cria uma instância de ResourceProtector
require_auth = ResourceProtector()

# Obtém o domínio do Auth0 e a audiência da variáveis de ambiente
auth0_domain = os.environ.get("AUTH0_DOMAIN")
api_audience = os.environ.get("API_URL")

# Cria uma instância de Auth0JWTBearerTokenValidator com o domínio e a audiência
validator = Auth0JWTBearerTokenValidator(auth0_domain, api_audience)

# Registra o validador com o ResourceProtector
require_auth.register_token_validator(validator)


# Define uma rota pública que não requer autenticação
@APP.route("/api/public")
def public():
    """Sem autenticação necessária."""
    response = (
        "Olá do endpoint público! Não é preciso autenticação aqui."
    )
    return jsonify(message=response)

# Define uma rota privada que requer autenticação
@APP.route("/api/private")
@require_auth()  # Este decorador verifica a existência de um token de autenticação válido
def private():
    """Com autenticação necessária."""
    response = (
        "Olá do endpoint privado! É preciso autenticação aqui."
    )
    return jsonify(message=response)

# Define uma rota que retorna um token de acesso
# Esta rota não é completamente segura
@APP.route("/api/token", methods=["POST"])
def get_token():
    url = os.environ.get("AUTH0_TOKEN_URL") 
    api_url = os.environ.get("API_URL")

    
    # Define o payload para a solicitação do token
    payload = {
        "grant_type": "client_credentials",
        "audience": api_url
    }

    client_id = os.environ.get("MTM_CLIENT_ID")
    client_secret = os.environ.get("MTM_CLIENT_SECRET")
    
    print(client_id)
    print(client_secret)
    # Faz uma solicitação POST para o endpoint de token do Auth0
    response = requests.post(url, auth=HTTPBasicAuth(client_id , client_secret), data=payload)
    access_token = response.json().get('access_token')

    print(response.json())
    # Retorna o token de acesso
    return jsonify({"access_token": access_token})

# Define uma rota privada que requer autenticação
@APP.route('/api/getatividades', methods=['POST'])
@require_auth()
def get_atividades_for_user():
    data = request.get_json()
    user_id = data.get('user_id')

    print(f"Searching for user_id: {user_id}")

    # Query all Atividade instances and print their valid_ids
    all_atividades = Atividade.query.all()
    for atividade in all_atividades:
        print(f"valid_ids for atividade {atividade.id}: {atividade.valid_ids}")

    # Query the Atividade table for instances where valid_ids contains the user's ID
    #MOSTRAR NO RELATORIO O PORQUE DE EU TER DE METER ARRAY NO MODELO
    atividades = Atividade.query.filter(Atividade.valid_ids.contains([user_id])).all()

    # Format the atividades and return them as a JSON response
    return jsonify([format_atividade(atividade) for atividade in atividades])

@APP.route('/api/createAtividade', methods=['POST'])
@require_auth()
def create_atividade():
    data = request.get_json()

    new_atividade = Atividade(
        name=data.get('name'),
        valid_ids=data.get('valid_ids')
    )

    db.session.add(new_atividade)
    db.session.commit()

    return jsonify({'message': 'New atividade created!'}), 201

from app import db, APP

#with APP.app_context():
    #db.drop_all()  # Drop all tables
    #db.create_all()  # Create all tables with the new schema
        
# Executa a aplicação
if __name__ == "__main__":
    APP.debug = True
    APP.run()