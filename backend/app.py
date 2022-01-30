from flask import Flask,jsonify,request
import pymysql 
from flask_cors import CORS
from flask_bcrypt import Bcrypt


from model import blogModel,authModel
from service import blogService,authService
from view import create_blog_endpoints,create_auth_endpoints


class Services:
    pass

def create_app(test_config = None):
    app = Flask(__name__)
    app.config['JSON_AS_ASCII'] = False
    CORS(app)

    database = pymysql.connect(host='127.0.0.1', user='root', password='12345678', charset='utf8',db='joblog')

    blog_Model = blogModel(database)
    auth_Model = authModel(database)

    blog_services=Services
    auth_services=Services

    blog_services.blogServices = blogService(blog_Model)
    auth_services.authServices = authService(auth_Model)

    create_blog_endpoints(app,blog_services)
    create_auth_endpoints(app,auth_services)

    return app