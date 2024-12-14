from . import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Unikalny identyfikator użytkownika
    email = db.Column(db.String(120), unique=True, nullable=False)  # Email użytkownika
    name = db.Column(db.String(80), nullable=False)  # Nazwa użytkownika
    skills = db.Column(db.String(200))  # Opcjonalne umiejętności
    password = db.Column(db.String(200), nullable=False)  # Hasło użytkownika (zahaszowane)
    role = db.Column(db.String(20), nullable=False, default="Osoba potrzebująca")  # Rola użytkownika
    description = db.Column(db.Text, nullable=True)  # Opcjonalny opis
    birth_date = db.Column(db.Date, nullable=True)  # Data urodzenia

    # Relacja z Post, backref do posts w User
    posts = db.relationship('Post', backref='author', lazy=True)  # 'author' dla Post


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(300), nullable=True)  # URL zdjęcia (opcjonalne)
    is_paid = db.Column(db.Boolean, nullable=False, default=False)  # Płatna/darmowa pomoc
    tags = db.Column(db.String(300), nullable=True)  # Lista tagów w formie ciągu znaków (np. "tag1,tag2,tag3")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Relacja do User, backref do 'author' w Post
    user = db.relationship('User', backref=db.backref('posts', lazy=True))  # 'posts' w User

