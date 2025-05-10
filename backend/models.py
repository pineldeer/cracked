from database import create_connection
from sqlite3 import Error

class User:
    def __init__(self, id, username, image_path):
        self.id = id
        self.username = username
        self.image_path = image_path

class Grave:
    def __init__(self, id, user_id, content):
        self.id = id
        self.user_id = user_id
        self.content = content

class Chat:
    def __init__(self, id, user_id, question, answer, order_idx):
        self.id = id
        self.user_id = user_id
        self.question = question
        self.answer = answer
        self.order_idx = order_idx

