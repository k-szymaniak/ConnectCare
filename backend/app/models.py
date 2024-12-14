from . import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Unikalny identyfikator użytkownika
    email = db.Column(db.String(120), unique=True, nullable=False)  # Email użytkownika
    name = db.Column(db.String(80), nullable=False)  # Nazwa użytkownika
    skills = db.Column(db.String(200))  # Opcjonalne umiejętności
    password = db.Column(db.String(200), nullable=False)  # Hasło użytkownika (zahaszowane)
    role = db.Column(db.String(20), nullable=False, default="Osoba potrzebująca")  # Rola użytkownika
    description = db.Column(db.Text, nullable=True)  # Opcjonalny opis
    birth_date = db.Column(db.Date, nullable=True)  # Data urodzenia

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Powiązanie z użytkownikiem

