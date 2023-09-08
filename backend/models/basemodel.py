#!/usr/bin/python3
from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
import uuid
from datetime import datetime
"""Base model that all other classes imherit from"""
Base = declarative_base()


class BaseModel():
    """class containing the common attributes of other classes"""
    id = Column(String(60), nullable=False, primary_key=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow())

    def __init__(self, *args, **kwargs):
        """initialises the class"""
        self.id = str(uuid.uuid4())
        self.created_at = datetime.now()
        if kwargs is not None and kwargs != {}:
            for key, value in kwargs.items():
                if key == "__class__":
                    continue
                self.__dict__[key] = value
                if key == "created_at":
                    self.__dict__[key] = datetime.strptime(value, "%Y-%m-%dT%H:%M:%S.%f")
                    
    def __str__(self):
        return("[{}] ({}) {}".format(self.__class__.__name__,
                                     self.id, self.__dict__))
            

    def save(self):
        """saves the instance to the database"""
        from models import storage
        storage.new(self)
        storage.save()

    def delete(self):
        """deletes an instance from the database"""
        from models import storage
        storage.delete()

    def to_dict(self):
        new_dict = self.__dict__.copy()
        new_dict["__class__"] = self.__class__.__name__
        new_dict["created_at"] = new_dict["created_at"].isoformat()
        return new_dict
