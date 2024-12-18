from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User, Post, Comment
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
        filter_type = request.args.get('filter', 'all')
        if filter_type == 'paid':
            posts = Post.query.filter_by(is_paid=True).all()
        elif filter_type == 'free':
            posts = Post.query.filter_by(is_paid=False).all()
        else:
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
        post = Post.query.get(post_id)
        if not post:
            return jsonify({"error": "Post not found"}), 404

        comments = Comment.query.filter_by(post_id=post_id).all()

        result = []
        for comment in comments:
            if comment.user_id == post.user_id or comment.user_id == comment.user_id:
                # Twórca posta lub twórca komentarza widzi pełną treść
                result.append({
                    "id": comment.id,
                    "content": comment.content,
                    "user_name": comment.user_name
                })
            else:
                # Inni użytkownicy widzą tylko nick twórcy komentarza
                result.append({
                    "id": comment.id,
                    "content": "Komentarz jest ukryty",
                    "user_name": comment.user_name
                })

        return jsonify(result), 200

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

        new_comment = Comment(content=content, post_id=post_id, user_id=user_id, user_name=user.name)
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

# Pobranie postów użytkownika po ID
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
            "tags": post.tags,
            "user_id": post.user_id,
            "created_at": post.created_at
        } for post in posts]), 200

    except Exception as e:
        print(f"Error during fetching user posts: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500
