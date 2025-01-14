from app import create_app, db
from app.models import User, Post, Comment, Message

app = create_app()

with app.app_context():
    # Usuń wszystkie rekordy z tabel
    db.session.query(User).delete()
    db.session.query(Post).delete()
    db.session.query(Comment).delete()
    db.session.query(Message).delete()
    
    # Zatwierdź zmiany
    db.session.commit()

    print("Wszystkie dane zostały usunięte z bazy danych.")