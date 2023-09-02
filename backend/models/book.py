#!/usr/bin/python3
"""book class"""

from models.basemodel import BaseModel

class Book(BaseModel):
    """inherots from basemodel"""
    id = ""
    title = ""
    genre = ""
    added_at = ""
    display_as = []
    cover_img = ""
    rating = ""
    desription = ""
    read_link = ""
    author = ""
    subtitle = ""
    no_of_pages = 0
