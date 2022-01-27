from flask import Flask,jsonify,request
import pymysql 
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import jwt
from model.blog_model import blogModel
from service.blog_service import blogService
from view.index import create_endpoints


app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)

database = pymysql.connect(host='127.0.0.1', user='root', password='12345678', charset='utf8',db='joblog')

blog_Model = blogModel(database)

services = blogService(blog_Model)

create_endpoints(app,services)

if __name__ == '__main__':
    app.run(debug=True)
    