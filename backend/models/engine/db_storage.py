#!/usr/bin/python3
"""database engine using mysql"""

from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import create_engine
import os
from models.basemodel import Base


class DBStorage:
    """Database stoarge class for our book app"""
    __engine = None
    __session = None

    def __init__(self):
        user = 'mike'
        passwd = 'alx'
        host = 'localhost'
        database = 'book_rec_db'
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'
                                      .format(user, passwd, host, database), pool_pre_ping=True)

    def all(self, cls=None):
        """retusn all instance in the database"""
        if not self.__session:
            self.reload()
        objects = {}
        cl = None
        if isinstance(cls, str):
            cl = self.classes().get(cls, None)
        if cl:
            for obj in self.__sessíon.query(Class):
                objects[obj.__class__.__name__ + "-" + obj.id] = obj
        else:
            for cls in self.classes().values():
                for obj in self.__session.query(cls):
                    objects[obj.__class__.__name__ + "-" + obj.id] = obj
        return objects
    
    def reload(self):
        """reloads objrcts in the database"""
        Base.metadata.create_all(self.__engine)
        session_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(session_factory)
        self.__session = Session()

    def new(self, obj):
        """create a new instanve in the database"""
        self.__session.add(obj)

    def save(self):
        """save tye current session"""
        self.__session.commit()

    def delete(self, obj=None):
        """deletes an object"""
        if not self.__session:
            self.reload()
        if obj:
            self.__session.delete(obj)
    def close(self):
        """Dispose of current session if active"""
        self.__session.remove()
    def classes(self):
        """ returns the classws dict"""
        from models.book import Book
        from models.user import User
        classes = {"User": User, 'Book': Book}
        return classes
