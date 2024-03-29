from flask import request, jsonify, send_file
import os
from werkzeug.utils import secure_filename
import uuid



def create_blog_endpoints(app, services,s3):
    blog_service  = services.blogServices

    @app.route('/',methods=['GET'])
    def index():
        if request.method == 'GET':
            page = int(request.args.get('page'))
            limit = request.args.get('limit')
            if page>=0 and limit:
                blogData = blog_service.get_Blog(page,limit)
                return jsonify({'result':'success','nextPage':page+1,'data': blogData["data"],'msg': 'blog정보 가져오기',"isEnd":blogData["isEnd"]})
            else:
                return jsonify({'result':'success','msg': 'blog정보 가져오기 실패'}),400

    @app.route('/blog',methods=['POST','PUT','DELETE'])
    def blogPost():
        value = request.form
        token = request.headers['Authorization']
        url = "http://joblog.kro.kr:5000/image?file=joblog_Default_background.png"
        if(token == ""):
            return jsonify({'result':'failure','msg': '유저 정보 가져오기 실패'}) ,400
        
        if request.files.get("banner") is not None:
            file = request.files["banner"]
            fileName = str(uuid.uuid4())+'.'+file.filename.split('.')[1]
            file.save(os.path.join(app.config["IMAGE_UPLOADS"],fileName))
            url = "https://joblog-images-buckit.s3.ap-northeast-2.amazonaws.com/images/"+fileName
            s3.upload_file('static/'+fileName,'joblog-images-buckit','images/'+fileName)
        if request.method == 'POST':
            status = blog_service.post_new_blog(value,url,token)
            msg = 'blog 생성'
        elif request.method == 'PUT':
            status = blog_service.put_blog(value,url,token)
            msg = 'blog 수정'
        elif request.method == 'DELETE':
            status = blog_service.delete_blog(value,token)
            msg = 'blog 삭제'
        if status == 400:
            return jsonify({'msg': '포함되지 않는 데이터가 있습니다'}),400
        else:
            return jsonify({'result':'success','msg': msg})



    @app.route('/blog/board',methods=['GET'])
    def getBoard():
        if request.method == 'GET':
            idx = request.args.get('idx')
            board = blog_service.get_select_board(idx)
            return jsonify({'result':'success','data': board,'msg': 'blog 불러오기'})
    
    @app.route('/image',methods=['GET','POST'])
    def showImg():
        if request.method == 'GET':
            fileName = request.args.get('file')
            if fileName:
                if os.path.isfile(os.path.join(app.config["IMAGE_UPLOADS"],fileName)):
                    return send_file(os.path.join(app.config["IMAGE_UPLOADS"],fileName),mimetype='image/gif',attachment_filename="download")
                else:
                    return jsonify({"msg":"이미지를 찾을 수 없습니다."}),404
        if request.method == 'POST':
            file = request.files["img"]
            fileName = str(uuid.uuid4())+'.'+file.filename.split('.')[1]
            file.save(os.path.join(app.config["IMAGE_UPLOADS"],fileName))
            url = "https://joblog-images-buckit.s3.ap-northeast-2.amazonaws.com/images/"+fileName
            s3.upload_file('static/'+fileName,'joblog-images-buckit','images/'+fileName)
            if url:
                return jsonify({'result':'success','data':url})
            else:
                return jsonify({'result':'failure','msg': '이미지 없음'}) ,400

    @app.route('/blog/comment',methods=['POST'])
    def comment():
        if request.method == 'POST':
            data = request.json
            token = request.headers['Authorization']
            print("토큰:",token)
            if(token == ""):
                return jsonify({'result':'failure','msg': '유저 정보 가져오기 실패'}) ,400
            status = blog_service.post_comment(data,token)
            if status == 400:
                return jsonify({"msg":"포함되지 않는 데이터가 있습니다"}),400
            else:
                return jsonify({'result':'success','msg': '댓글 작성'})
                
    @app.route('/blog/likes',methods=['POST'])
    def likes():
        if request.method == 'POST':
            data = request.json
            token = request.headers['Authorization']
            if(token == ""):
                return jsonify({'result':'failure','msg': '유저 정보 가져오기 실패'}) ,400
            status = blog_service.post_likes(data,token)
            if status == 400:
                return jsonify({"msg":"포함되지 않는 데이터가 있습니다"}),400
            else:
                return jsonify({'result':'success','msg': '좋아요 %d'% (not data['isLike'])})
            
    @app.route('/blog/search',methods=['GET'])
    def search():
        if request.method == 'GET':
            title = request.args.get('title')
            searchData = blog_service.post_search(title)
            if searchData == 400:
                return jsonify({"msg":"검색어 없음"}),400
            elif searchData == 404:
                return jsonify({"msg":"검색 결과 없음"}),404
            else:
                return jsonify({'result':'success','data':searchData,'msg': '댓글 작성'})
    

    @app.route('/blog/user',methods=['GET'])
    def userBoard():
        if request.method == 'GET':
            token = request.headers['Authorization']
            userIdx = request.args.get('userIdx')
            page = int(request.args.get('page'))
            limit = request.args.get('limit')
            if page>=0 and limit:
                if(token == ""):
                    return jsonify({'result':'failure','msg': '유저 정보 가져오기 실패'}) ,400
                elif userIdx:
                    userBoard = blog_service.get_ussr_board(userIdx,page,limit)
                else:
                    userBoard = blog_service.get_my_board(token,page,limit)
            else:
                return jsonify({'result':'failure','msg': 'blog정보 가져오기 실패'}),400
            return jsonify({'result':'success', 'nextPage':page+1, 'msg': 'userBoard 가져오기 성공', 'data':userBoard['data'],'isEnd':userBoard['isEnd']})