#!/usr/bin/python3
from models.basemodel import BaseModel, Base
from sqlalchemy import Column, String, Integer, Table, ForeignKey
from sqlalchemy.orm import relationship
"""The user class"""
user_favourite_books = Table('user_favourite_books', Base.metadata,
                            Column('user_id', Integer, ForeignKey('users.id')),
                             Column('book_id', Integer, ForeignKey('books.id')),
                             extend_existing=True
)

class User(BaseModel, Base):
    """User class that inherits from basemodel"""
    __tablename__ = "users"
    
    first_name = Column(String(255), nullable=True)
    last_name = Column(String(255), nullable=True)
    email = Column(String(255), nullable=True)
    password = Column(String(255), nullable=True)
    gender = Column(String(10), nullable=True)
    age = Column(Integer, nullable=True)
    #likes = []
    favourite_books = relationship('Book', secondary="user_favourite_books", back_populates='favourited_by')
