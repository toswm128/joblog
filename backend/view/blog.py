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
            token = request.headers['Authorization']
            file = request.files["banner"]
            fileName = str(uuid.uuid4())+'.'+file.filename.split('.')[1]
            file.save(os.path.join(app.config["IMAGE_UPLOADS"],fileName))
            url = "http://localhost:5000/image?file="+fileName
            status = blog_service.post_new_blog(value,url,token)
            if status == 400:
                return jsonify({'msg': '포함되지 않는 데이터가 있습니다'}),400
            else:
                return jsonify({'result':'success','data': blog_service.get_Blog(),'msg': 'blog 생성!'})

    @app.route('/blog/board',methods=['GET'])
    def getBoard():
        if request.method == 'GET':
            idx = request.args.get('idx')
            token = request.headers['Authorization']
            board = blog_service.get_select_board(idx,token)
            return jsonify({'result':'success','data': board,'msg': 'blog 불러오기'})
            
    @app.route('/m',methods=['POST'])
    def postMData():
        if request.method == 'POST':
            value = request.json
            return jsonify({'result':'success'})

    @app.route('/image',methods=['GET'])
    def showImg():
        if request.method == 'GET':
            fileName = request.args.get('file')
            if fileName:
                if os.path.isfile(os.path.join(app.config["IMAGE_UPLOADS"],fileName)):
                    return send_file(os.path.join(app.config["IMAGE_UPLOADS"],fileName),mimetype='image/gif',attachment_filename="download")
                else:
                    return jsonify({"msg":"이미지를 찾을 수 없습니다."}),404

    @app.route('/blog/comment',methods=['POST'])
    def comment():
        if request.method == 'POST':
            data = request.json
            token = request.headers['Authorization']
            status = blog_service.post_comment(data,token)
            if status == 400:
                return jsonify({"msg":"포함되지 않는 데이터가 있습니다"}),400
            else:
                return jsonify({'result':'success','msg': '댓글 작성'})
                
