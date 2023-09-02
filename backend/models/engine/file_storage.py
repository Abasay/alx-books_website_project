#!/usr/bin/python3
""" file stirage class to help with storing fat to a file"""

import json
from datetime import datetime
import os

class FileStorage:
    __objects = {}
    __file_name = "test_file.json"

    def all(self):
        """shows all the data stored in file"""
        return FileStorage.__objects

    def new(self, obj):
        if obj is not None:
            key = obj.__class__.__name__ + "-" + obj.id
            FileStorage.__objects[key] = obj
    def save(self):
        """savea objects to tage json file"""
        with open(FileStorage.__file_name, "w", encoding="utf-8") as f:
            d = {k: v.to_dict() for k, v in FileStorage.__objects.items()}
            json.dump(d, f)

    def reload(self):
        """deserializes the JSON file to __objects"""
        if not os.path.isfile(FileStorage.__file_name):
            return
        with open(FileStorage.__file_name, "r", encoding="utf-8") as fil:
            obj_dict = json.load(fil)
            obj_dict = {k: self.classes()[v["__class__"]](**v) for k, v in obj_dict.items()}
            FileStorage.__objects = obj_dict

    def classes(self):
        """ returns the classws dict"""
        from models.book import Book
        from models.user import User
        classes = {"User": User, "Book": Book}
        return classes
