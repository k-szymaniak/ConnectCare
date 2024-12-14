import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate  # Import Flask-Migrate

# Inicjalizacja bazy danych i migracji
db = SQLAlchemy()
migrate = Migrate()  # Inicjalizacja Flask-Migrate

def create_app():
    app = Flask(__name__)

    # Konfiguracja bazy danych
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "../database.db")}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Inicjalizacja rozszerzeń
    db.init_app(app)
    migrate.init_app(app, db)  # Integracja Flask-Migrate z aplikacją i bazą danych
    CORS(app)

    # Logowanie ścieżki do bazy danych
    print(f"Baza danych znajduje się pod: {app.config['SQLALCHEMY_DATABASE_URI']}")

    # Rejestracja blueprintów (tras)
    with app.app_context():
        from .routes import main  # Import tras
        app.register_blueprint(main)

        # Tworzenie tabel w bazie danych, jeśli jeszcze ich nie ma
        db.create_all()

    return app
