from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from .models import User, Post, Comment, Message
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
        role = data.get('role', 'Osoba potrzebująca')
        description = data.get('description', '')
        birth_date_str = data.get('birth_date')

        birth_date = datetime.strptime(birth_date_str, "%Y-%m-%d").date() if birth_date_str else None

        if not email or not name or not password:
            return jsonify({"error": "Missing required fields"}), 400

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"error": "User already exists"}), 400

        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

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

        user = User.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password, password):
            return jsonify({"error": "Invalid email or password"}), 401

        access_token = create_access_token(identity=user.id)

        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
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

# Tworzenie posta
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

        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

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

# Pobranie szczegółów posta po ID
@main.route('/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    try:
        post = Post.query.get(post_id)
        if not post:
            return jsonify({"error": "Post not found"}), 404

        return jsonify({
            "id": post.id,
            "title": post.title,
            "description": post.description,
            "image_url": post.image_url,
            "is_paid": post.is_paid,
            "tags": post.tags,
            "user_id": post.user_id
        }), 200

    except Exception as e:
        print(f"Error during fetching post details: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

# Pobranie komentarzy dla konkretnego posta
@main.route('/comments/<int:post_id>', methods=['GET'])
def get_comments(post_id):
    try:
        comments = Comment.query.filter_by(post_id=post_id).all()

        return jsonify([{
            "id": comment.id,
            "content": comment.content,
            "user_name": comment.user_name
        } for comment in comments]), 200

    except Exception as e:
        print(f"Error during fetching comments: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

# Dodanie komentarza do posta
@main.route('/comments', methods=['POST'])
def add_comment():
    try:
        data = request.json
        post_id = data.get('post_id')
        user_id = data.get('user_id')
        content = data.get('content')

        if not post_id or not user_id or not content:
            return jsonify({"error": "Missing required fields"}), 400

        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        post = Post.query.get(post_id)
        if not post:
            return jsonify({"error": "Post not found"}), 404

        new_comment = Comment(
            content=content,
            post_id=post_id,
            user_id=user_id,
            user_name=user.name
        )
        db.session.add(new_comment)
        db.session.commit()

        return jsonify({
            "id": new_comment.id,
            "content": new_comment.content,
            "user_name": new_comment.user_name
        }), 201

    except Exception as e:
        print(f"Error during adding comment: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

# Wysyłanie wiadomości
@main.route('/messages/send', methods=['POST'])
@jwt_required()
def send_message():
    try:
        data = request.get_json()

        if not data or 'receiver_id' not in data or 'content' not in data:
            return jsonify({"error": "Brak wymaganych pól: receiver_id i content"}), 422

        receiver_id = data.get('receiver_id')
        content = data.get('content')

        if not isinstance(receiver_id, int):
            return jsonify({"error": "receiver_id musi być liczbą"}), 422

        if not isinstance(content, str) or not content.strip():
            return jsonify({"error": "content musi być niepustym ciągiem znaków"}), 422

        sender_id = get_jwt_identity()
        receiver = User.query.get(receiver_id)
        if not receiver:
            return jsonify({"error": "Odbiorca nie istnieje"}), 404

        message = Message(sender_id=sender_id, receiver_id=receiver_id, content=content)
        db.session.add(message)
        db.session.commit()

        return jsonify({"message": "Wiadomość wysłana pomyślnie"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Pobranie wiadomości
@main.route('/messages/<int:user_id>', methods=['GET'])
@jwt_required()
def get_messages(user_id):
    try:
        current_user_id = get_jwt_identity()

        messages = Message.query.filter(
            ((Message.sender_id == current_user_id) & (Message.receiver_id == user_id)) |
            ((Message.sender_id == user_id) & (Message.receiver_id == current_user_id))
        ).order_by(Message.timestamp).all()

        return jsonify([{
            "id": message.id,
            "sender_id": message.sender_id,
            "receiver_id": message.receiver_id,
            "content": message.content,
            "timestamp": message.timestamp,
            "is_read": message.is_read
        } for message in messages]), 200

    except Exception as e:
        print(f"Error during fetching messages: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500
