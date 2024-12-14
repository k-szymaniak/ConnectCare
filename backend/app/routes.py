from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User
from . import db

main = Blueprint('main', __name__)

# Rejestracja użytkownika
@main.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        email = data.get('email')
        name = data.get('name')
        password = data.get('password')
        role = data.get('role', 'Osoba potrzebująca')  # Domyślna wartość to "Osoba potrzebująca"
        description = data.get('description', '')
        birth_date = data.get('birth_date')  # Data w formacie YYYY-MM-DD

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

        # Logowanie otrzymanych danych
        print(f"Attempting login with email: {email} and password: {password}")

        if not email or not password:
            return jsonify({"error": "Missing required fields"}), 400

        # Sprawdź, czy użytkownik istnieje
        user = User.query.filter_by(email=email).first()
        if not user:
            print("User not found")
            return jsonify({"error": "Invalid email or password"}), 401

        # Weryfikacja hasła
        if not check_password_hash(user.password, password):
            print("Password does not match")
            return jsonify({"error": "Invalid email or password"}), 401

        # Zwróć dane użytkownika
        print(f"Login successful for user: {user.email}")
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role,
                "description": user.description,
                "birth_date": str(user.birth_date)  # Konwersja na string
            }
        }), 200

    except Exception as e:
        print(f"Error during login: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500


# Pobranie profilu użytkownika
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
            "skills": user.skills,
            "role": user.role,
            "description": user.description,
            "birth_date": str(user.birth_date)  # Konwersja na string
        }), 200

    except Exception as e:
        print(f"Error during profile retrieval: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500


# Edycja profilu użytkownika
@main.route('/profile/<int:user_id>', methods=['PUT'])
def update_profile(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        data = request.json
        user.name = data.get('name', user.name)
        user.skills = data.get('skills', user.skills)
        user.role = data.get('role', user.role)
        user.description = data.get('description', user.description)
        user.birth_date = data.get('birth_date', user.birth_date)

        db.session.commit()

        return jsonify({"message": "Profile updated successfully!"}), 200

    except Exception as e:
        print(f"Error during profile update: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500
