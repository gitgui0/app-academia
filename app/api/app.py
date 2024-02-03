from flask import Flask, jsonify, request, make_response, g
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy 
import jwt as pyjwt
from datetime import datetime, timedelta
from functools import wraps
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, create_refresh_token, get_jwt_identity
import bcrypt
import time
import os


app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')  # Replace with your secret key

app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=10)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=1)

jwt = JWTManager(app)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')# Variável de Ambiente URL da BD
db = SQLAlchemy(app) # inicializar uma instância da BD SQLAlchemy para a app.

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

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True)
    email = db.Column(db.String(120), index=True)
    password_hash = db.Column(db.String(256)) 
    cargo = db.Column(db.String(120), index=True)
    fsg = db.Column(db.String(120), index=True) # First Session Flag
    pfp_url = db.Column(db.String(120), index=True)

    def set_password(self, password):
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "cargo": self.cargo,
            "fsg": self.fsg,
            "pfp_url": self.pfp_url
        }


def is_token_expired(token, secret_key):   
    try:        
        # Decode the token without verifying the expiration time
        decoded_token = pyjwt.decode(token, secret_key,algorithms=["HS256"], options={"verify_exp": False})
        #print(decoded_token)
        # Get the current time
        current_time = time.time()
        
        token_exp = decoded_token['exp']

        print("Token", token_exp, "Current", current_time, "Expired?", token_exp < current_time)
        return token_exp < current_time
    except pyjwt.InvalidTokenError as e:
        # If the token is invalid, print the token and the exception message
        #print(f"Invalid token: {token}")
        #print(f"Exception message: {str(e)}")
        # Return True to indicate that it's "expired"
        return True

def refresh_access_token(refresh_token):
    # Check if the refresh token is expired
    print('refresh')
    if is_token_expired(refresh_token, 'your-secret-key'):
        print('Refresh token is expired')
        return None

    try:
        # Decode the refresh token
        decoded_refresh_token = pyjwt.decode(refresh_token, 'your-secret-key', algorithms=['HS256'])
        
        # Create a new access token with the same identity
        new_access_token = pyjwt.encode({
            'exp': datetime.utcnow() + app.config['JWT_ACCESS_TOKEN_EXPIRES'], 
            'iat': datetime.utcnow(),  # Set the issued at time
            'sub': decoded_refresh_token['sub']  # Set the subject (identity)
        }, 'your-secret-key', algorithm='HS256')
        #print(new_access_token)
        return new_access_token
    except pyjwt.InvalidTokenError:
        # If the refresh token is invalid, return None
        return None
    
# @app.before_request
# def before_request():
#     # Extract the token from the HTTP-only cookie
#     token = request.cookies.get('access_token')
#     if token:
#         request.environ['HTTP_AUTHORIZATION'] = f'Bearer {token}'

#         # Debugging information
#         print(f'Token attached to Authorization header: {token}')
#         print(f'Request path: {request.path}')

@app.before_request
def before_request():
    if request.path != '/api/login':
        # Extract the access token and refresh token from the HTTP-only cookies
        access_token = request.cookies.get('access_token')
        refresh_token = request.cookies.get('refresh_token')
        
        #Se AT existir
        if access_token:
            #Verificar se a AT esta expired
            
            # Check if the access token is expired
            is_access_token_expired = is_token_expired(access_token, app.config['SECRET_KEY'])
            print(is_access_token_expired)

            if is_access_token_expired and refresh_token:
                #Se existir RT, e a AT estiver expired
                
                #Criar token se refresh token ano tiver expired( validacao feita dentro da funcao refresh_access_token)
                # Access token is expired, and a refresh token is available
                new_access_token = refresh_access_token(refresh_token)
                
                #Se a NAT for criada, ou seja, a refresh token nao tiver expired
                if new_access_token:
                    # Update the access token in the Authorization header
                    request.environ['HTTP_AUTHORIZATION'] = f'Bearer {new_access_token}'

                    response = make_response()

                    # Set the new access token in a HTTP-only cookie
                    response.set_cookie('access_token', new_access_token, httponly=True)
                   
                    # Debugging information
                    #print(f'Access Token refreshed and attached to Authorization header: {new_access_token}')
                    #print(f'Request path: {request.path}')
                #Se RT estiver expired, devolver 401(nao autorizado) para depois no frontned ndar redirect para o login
                else:
                    return jsonify({"message":"Refresh Token expirada. Por favor, faça novamente o login"}),401
            else:
                request.environ['HTTP_AUTHORIZATION'] = f'Bearer {access_token}'

                # Debugging information
                #print(f'Token attached to Authorization header: {access_token}')
                #print(f'Request path: {request.path}')
        
@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    # Query the database for the user
    user = User.query.filter_by(email=email).first()

    # If the user was found and the password is correct
    if user and bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8')):
        # Create the tokens
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)

        response = make_response(jsonify(message='Logged in'))

        # Set the tokens in HTTP-only cookies
        response.set_cookie('access_token', access_token, httponly=True)
        response.set_cookie('refresh_token', refresh_token, httponly=True)
    
        return response
    else:
        return jsonify({'message': 'Email ou palavra-passe incorretos'}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    # Create a response
    response = make_response("Logout Successful")

    # Set the access_token and refresh_token cookies to empty strings
    # and their max-age to 0 to clear them
    response.set_cookie('access_token', '', max_age=0)
    response.set_cookie('refresh_token', '', max_age=0)

    return response

@app.route('/api/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    # Get the username from the refresh token, and create a new access token
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)

    return jsonify(access_token=access_token)


@app.route('/api/unprotected')
def unprotected():
    return jsonify({'message': 'Anyone can view this!'})

@app.route('/api/userinfo', methods=['GET'])
@jwt_required()
def userinfo():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({'message': 'User not found'}), 404

    return jsonify(user.to_dict()), 200



@app.route('/api/getatividades', methods=['POST'])
@jwt_required()
def get_atividades_for_user():
    data = request.get_json()
    user_id = data.get('user_id')

    print(f"Searching for user_id: {user_id}")

    
    atividades = Atividade.query.all()

    # Format the atividades and return them as a JSON response
    return jsonify([format_atividade(atividade) for atividade in atividades])

@app.route('/api/create_user', methods=['POST'])
@jwt_required()
def create_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = email
    user = User(email=email, name=name)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/edit_user/<int:user_id>', methods=['PUT'])
@jwt_required()
def edit_user(user_id):
    data = request.get_json()
    user = User.query.get(user_id)
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        user.set_password(data['password'])
    db.session.commit()
    return jsonify({'message': 'User updated successfully'}), 200

@app.route('/api/delete_user/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    user = User.query.get(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200

#with app.app_context():
#    db.drop_all()  # Drop all tables
#    db.create_all()  # Create all tables with the new schema
    
if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
    