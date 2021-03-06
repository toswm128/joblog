from flask import Flask,jsonify,request
import pymysql 
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import boto3



from model import blogModel,authModel
from service import blogService,authService
from view import create_blog_endpoints,create_auth_endpoints



class Services:
    pass

def create_app():
    app = Flask(__name__)
    app.config['JSON_AS_ASCII'] = False
    CORS(app, resources={r"*": {"origins": "*"}})
    app.config["IMAGE_UPLOADS"] = "./static"



    blog_Model = blogModel()
    auth_Model = authModel()

    blog_services=Services
    auth_services=Services

    s3 = boto3.client(service_name='s3',aws_access_key_id="AKIA4NOPYSI7NB53ZPHR",
            aws_secret_access_key="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")

    blog_services.blogServices = blogService(blog_Model)
    auth_services.authServices = authService(auth_Model)

    create_blog_endpoints(app,blog_services,s3)
    create_auth_endpoints(app,auth_services,s3)

    return app