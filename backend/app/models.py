from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User
from . import db

# Tworzenie blueprinta dla tras
main = Blueprint('main', __name__)

# Rejestracja użytkownika
@main.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        email = data.get('email')
        name = data.get('name')
        password = data.get('password')

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
            avatar="https://via.placeholder.com/150"  # Domyślny avatar
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully!"}), 201

    except Exception as e:
        print(f"Error: {e}")
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
                "avatar": user.avatar
            }
        }), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500


# Pobranie profilu użytkownika (opcjonalne, jeśli potrzebne)
@main.route('/profile/<int:user_id>', methods=['GET'])
def get_profile(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify({
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "avatar": user.avatar,
            "skills": user.skills
        }), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500
