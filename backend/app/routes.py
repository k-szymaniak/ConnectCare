from flask import Blueprint, jsonify, request
from .models import User, Task
from . import db
from werkzeug.security import generate_password_hash

main = Blueprint('main', __name__)

@main.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{"id": u.id, "email": u.email, "name": u.name, "skills": u.skills} for u in users])

@main.route('/add-user', methods=['POST'])
def add_user():
    data = request.json
    new_user = User(email=data['email'], name=data['name'], skills=data.get('skills', ''))
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User added successfully!"})

@main.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{"id": t.id, "title": t.title, "description": t.description, "user_id": t.user_id} for t in tasks])

@main.route('/add-task', methods=['POST'])
def add_task():
    data = request.json
    new_task = Task(title=data['title'], description=data.get('description', ''), user_id=data.get('user_id'))
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task added successfully!"})

main = Blueprint('main', __name__)

@main.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        email = data.get('email')
        name = data.get('name')
        password = data.get('password')

        # Sprawdź, czy użytkownik już istnieje
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"error": "User already exists"}), 400

        # Haszowanie hasła
        hashed_password = generate_password_hash(password, method='sha256')

        # Dodaj użytkownika do bazy danych
        new_user = User(email=email, name=name, skills='', password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully!"})

    except Exception as e:
        print(f"Error: {e}")  # Loguj szczegóły błędu do terminala
        return jsonify({"error": "An unexpected error occurred"}), 500