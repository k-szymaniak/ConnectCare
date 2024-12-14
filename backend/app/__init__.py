import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate  # Import Flask-Migrate

# Inicjalizacja bazy danych
db = SQLAlchemy()
migrate = Migrate()  # Dodanie migracji

def create_app():
    app = Flask(__name__)

    # Konfiguracja bazy danych
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "../database.db")}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Inicjalizacja bazy danych i CORS
    db.init_app(app)
    migrate.init_app(app, db)  # Inicjalizacja migracji
    CORS(app)

    # Logowanie ścieżki do bazy danych
    print(f"Baza danych znajduje się pod: {app.config['SQLALCHEMY_DATABASE_URI']}")

    with app.app_context():
        db.create_all()  # Tworzenie tabel w bazie danych

        # Importowanie i rejestrowanie tras po inicjalizacji aplikacji
        from .routes import main
        app.register_blueprint(main)

    return app
