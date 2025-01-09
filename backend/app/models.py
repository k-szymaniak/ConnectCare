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

    # Relacja z Post
    posts = db.relationship('Post', backref='author', lazy=True)
    # Relacja z Comment
    comments = db.relationship('Comment', backref='comment_author', lazy=True)
    # Relacja z Message (wiadomości wysłane)
    sent_messages = db.relationship('Message', foreign_keys='Message.sender_id', backref='sender', lazy=True)
    # Relacja z Message (wiadomości odebrane)
    received_messages = db.relationship('Message', foreign_keys='Message.receiver_id', backref='receiver', lazy=True)


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(300), nullable=True)  # URL zdjęcia (opcjonalne)
    is_paid = db.Column(db.Boolean, nullable=False, default=False)  # Płatna/darmowa pomoc
    tags = db.Column(db.String(300), nullable=True)  # Lista tagów w formie ciągu znaków (np. "tag1,tag2,tag3")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Relacja z Comment
    comments = db.relationship('Comment', backref='related_post', lazy=True)


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)  # Treść komentarza
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Data stworzenia komentarza
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)  # Relacja z Post
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Relacja z User
    user_name = db.Column(db.String(100), nullable=False)  # Nick osoby komentującej


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Unikalny identyfikator wiadomości
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # ID nadawcy
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # ID odbiorcy
    content = db.Column(db.Text, nullable=False)  # Treść wiadomości
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)  # Data wysłania
    is_read = db.Column(db.Boolean, default=False)  # Status przeczytania

    def __repr__(self):
        return f"<Message from {self.sender_id} to {self.receiver_id}>"