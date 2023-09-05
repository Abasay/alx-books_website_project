#!/usr/bin/python3
"""book class"""
from sqlalchemy import Column, Integer, String, Text
from models.basemodel import BaseModel, Base
from sqlalchemy.orm import relationship
from models.user import user_favourite_books
class Book(BaseModel):
    """inherits from basemodel"""
    __tablename__ = "books"
    
    title = Column(String(255), nullable=False)
    genre = Column(String(255), nullable=False)
    cover_img = Column(String(255), nullable=False)
    desription = Column(Text)
    read_link = Column(String(255), nullable=False)
    author = Column(String(255), nullable=False)
    no_of_pages = Column(Integer)
    favourited_by = relationship('User', secondary=user_favourite_books, back_populates='favourite_books')
