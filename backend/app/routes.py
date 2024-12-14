from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User, Post
from . import db
from datetime import datetime

main = Blueprint('main', __name__)

# Rejestracja użytkownika
@main.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        email = data.get('email')
        name = data.get('name')
        password = data.get('password')
        role = data.get('role', 'Osoba potrzebująca')  # Domyślna wartość
        description = data.get('description', '')
        birth_date_str = data.get('birth_date')  # Data w formacie YYYY-MM-DD

        # Konwersja daty z ciągu znaków na obiekt datetime.date
        birth_date = datetime.strptime(birth_date_str, "%Y-%m-%d").date() if birth_date_str else None

        if not email or not name or not password:
            return jsonify({"error": "Missing required fields"}), 400

        # Sprawdź, czy użytkownik już istnieje
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"error": "User already exists"}), 400

        # Haszowanie hasła
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        # Tworzenie nowego użytkownika
        new_user = User(
            email=email,
            name=name,
            skills='',
            password=hashed_password,
            role=role,
            description=description,
            birth_date=birth_date
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully!"}), 201

    except Exception as e:
        print(f"Error during registration: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500


# Logowanie użytkownika
@main.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"error": "Missing required fields"}), 400

        # Sprawdź, czy użytkownik istnieje
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"error": "Invalid email or password"}), 401

        # Weryfikacja hasła
        if not check_password_hash(user.password, password):
            return jsonify({"error": "Invalid email or password"}), 401

        # Zwróć dane użytkownika
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role,
                "description": user.description,
                "birth_date": str(user.birth_date) if user.birth_date else None
            }
        }), 200

    except Exception as e:
        print(f"Error during login: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500


# Tworzenie posta (tylko dla osób potrzebujących pomocy)
@main.route('/create_post', methods=['POST'])
def create_post():
    try:
        data = request.json
        user_id = data.get('user_id')
        title = data.get('title')
        description = data.get('description')
        image_url = data.get('image_url')
        is_paid = data.get('is_paid', False)
        tags = data.get('tags', "")

        # Sprawdź, czy użytkownik o danej roli może dodać post
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        if user.role != 'Osoba potrzebująca':
            return jsonify({"error": "Only users with 'Osoba potrzebująca' role can create posts"}), 403

        # Tworzenie nowego posta
        new_post = Post(
            title=title,
            description=description,
            image_url=image_url,
            is_paid=is_paid,
            tags=tags,
            user_id=user_id
        )
        db.session.add(new_post)
        db.session.commit()

        return jsonify({"message": "Post created successfully!"}), 201

    except Exception as e:
        print(f"Error during post creation: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500


# Pobranie wszystkich postów
@main.route('/posts', methods=['GET'])
def get_posts():
    try:
        posts = Post.query.all()
        return jsonify([{
            "id": post.id,
            "title": post.title,
            "description": post.description,
            "image_url": post.image_url,
            "is_paid": post.is_paid,
            "tags": post.tags,
            "user_id": post.user_id
        } for post in posts]), 200

    except Exception as e:
        print(f"Error during fetching posts: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500


# Pobranie postów użytkownika (po ID)
@main.route('/user_posts/<int:user_id>', methods=['GET'])
def get_user_posts(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        posts = Post.query.filter_by(user_id=user_id).all()
        return jsonify([{
            "id": post.id,
            "title": post.title,
            "description": post.description,
            "image_url": post.image_url,
            "is_paid": post.is_paid,
            "tags": post.tags
        } for post in posts]), 200

    except Exception as e:
        print(f"Error during fetching user posts: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500
