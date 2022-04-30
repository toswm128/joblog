from flask import request, jsonify, send_file
import os
from werkzeug.utils import secure_filename
import uuid



def create_blog_endpoints(app, services):
    blog_service  = services.blogServices

    @app.route('/',methods=['GET'])
    def index():
        if request.method == 'GET':
            return jsonify({'result':'success','data': blog_service.get_Blog(),'msg': 'blog정보 가져오기'})

    @app.route('/blog/post',methods=['POST'])
    def blogPost():
        if request.method == 'POST':
            value = request.form
            file = request.files["banner"]
            fileName = str(uuid.uuid4())+'.'+file.filename.split('.')[1]
            file.save(os.path.join(app.config["IMAGE_UPLOADS"],fileName))
            url = "http://localhost:5000/image?file="+fileName
            blog_service.post_new_blog(value,url)
            return jsonify({'result':'success','data': blog_service.get_Blog(),'msg': 'blog 생성!'})

    @app.route('/blog/board',methods=['GET'])
    def getBoard():
        if request.method == 'GET':
            idx = request.args.get('idx')
            board = blog_service.get_select_board(idx)
            return jsonify({'result':'success','data': board,'msg': 'blog 불러오기'})
            
    @app.route('/m',methods=['POST'])
    def postMData():
        if request.method == 'POST':
            value = request.json
            print(value)
            return jsonify({'result':'success'})

    @app.route('/image',methods=['GET'])
    def showImg():
        if request.method == 'GET':
            fileName = request.args.get('file')
            return send_file(os.path.join(app.config["IMAGE_UPLOADS"],fileName),mimetype='image/gif',attachment_filename="download")