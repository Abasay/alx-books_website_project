#!/usr/bin/python3
from models.basemodel import BaseModel
"""The user class"""
class User(BaseModel):
    """User class that inherits from basemodel"""
    first_name = ""
    last_name = ""
    email = ""
    password = "" 
    gender = ""
    age = ""
    likes = []
    favourite_books = []
    
