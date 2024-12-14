from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash
from .models import User
from . import db
from werkzeug.security import check_password_hash

main = Blueprint('main', __name__)

@main.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        email = data.get('email')
        name = data.get('name')
        password = data.get('password')

        if not email or not name or not password:
            return jsonify({"error": "Missing required fields"}), 400

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"error": "User already exists"}), 400

        # Poprawione generowanie hasła
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        new_user = User(email=email, name=name, skills='', password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully!"})
        

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
