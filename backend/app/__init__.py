import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from datetime import timedelta

# Inicjalizacja bazy danych i migracji
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)

    # Konfiguracja bazy danych
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "../database.db")}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Konfiguracja JWT
    app.config['JWT_SECRET_KEY'] = 'twoj_super_tajny_klucz'  # Stały klucz sekretny
    app.config['JWT_TOKEN_LOCATION'] = ['headers']
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

    # Konfiguracja CORS
    CORS(app, resources={
        r"/*": {
            "origins": ["http://localhost:3000"],  # Zezwól tylko na żądania z frontendu (React)
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Zezwól na te metody HTTP
            "allow_headers": ["Content-Type", "Authorization"],  # Zezwól na te nagłówki
        }
    })

    # Inicjalizacja rozszerzeń
    db.init_app(app)
    migrate.init_app(app, db)
    jwt = JWTManager(app)

    # Rejestracja blueprintów (tras)
    with app.app_context():
        from .routes import main
        app.register_blueprint(main)
        db.create_all()  # Tworzenie tabel w bazie danych (jeśli nie istnieją)

    return app