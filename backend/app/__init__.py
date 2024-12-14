import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Inicjalizacja SQLAlchemy
db = SQLAlchemy()

def create_app():
    # Tworzenie instancji Flask
    app = Flask(__name__)

    # Ścieżka do bazy danych
    basedir = os.path.abspath(os.path.dirname(__file__))  # Ścieżka do folderu `app`
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "../database.db")}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Wyłączenie zbędnych powiadomień

    # Inicjalizacja rozszerzeń
    db.init_app(app)
    CORS(app)

    # Logowanie ścieżki do bazy danych
    print(f"Baza danych znajduje się pod: {app.config['SQLALCHEMY_DATABASE_URI']}")

    # Rejestracja tras (routes)
    with app.app_context():
        from .routes import main
        app.register_blueprint(main)  # Rejestracja blueprintu tras

        # Tworzenie tabel w bazie danych
        db.create_all()

    return app
