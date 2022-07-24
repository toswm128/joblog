from flask import request, jsonify
import jwt
import os
from werkzeug.utils import secure_filename
import uuid


def create_auth_endpoints(app, services,s3):
    user_service  = services.authServices

    @app.route('/login',methods=['POST'])
    def login():
        if request.method == 'POST':
            value = request.json
            loginUser = user_service.try_login(value['id'],value['password'])
            if loginUser == 404:
                return jsonify({"msg":"아이디를 찾을 수 없습니다."}),400
            elif loginUser == 400:
                return jsonify({"msg":"비밀번호가 일치하지 않습니다."}),400
            else:
                return jsonify({'message':'OK!','data':loginUser}), 200


    @app.route('/join',methods=['POST'])
    def Join():
        if request.method == 'POST':
            value = request.json
            joinInfo = user_service.try_join(value)
            if joinInfo == 400:
                return jsonify({'msg': '입력하지 않은 값이 있습니다'}),400
            else:
                return jsonify({'result':'success','data': joinInfo,'msg': '유저 정보 가져오기'})

    @app.route('/user',methods=['GET'])
    def getUserToId():
        if request.method == 'GET':
            token = request.headers['Authorization']
            userIdx = request.args.get('userIdx')
            if not token:
                return jsonify({'result':'success','msg': '유저 정보 가져오기 실패'}) ,400
            elif userIdx:
                userData = user_service.get_user_info(userIdx)
            else:
                userData = user_service.get_my_info(token)
            return jsonify({'result':'success','data': userData,'msg': '유저 정보 가져오기'})

    @app.route('/user/profile',methods=['PATCH'])
    def patchUserProfile():
        if request.method == 'PATCH':
            token = request.headers['Authorization']
            if not token:
                return jsonify({'result':'success','msg': '유저 정보 가져오기 실패'}) ,400
            src = request.form
            if src:
                user_service.patch_user_profile(src['profile'],token)

                return jsonify({'result':'success','msg': '유저 프로필 사진 변경'})
            else:
                file = request.files['profile']
                fileName = str(uuid.uuid4())+'.'+file.filename.split('.')[1]
                file.save(os.path.join(app.config["IMAGE_UPLOADS"],fileName))
                url = "https://joblog-images-buckit.s3.ap-northeast-2.amazonaws.com/images/"+fileName

                s3.upload_file('static/'+fileName,'joblog-images-buckit','images/'+fileName)

                user_service.patch_user_profile(url,token)
                return jsonify({'result':'success','msg': '유저 프로필 사진 변경'})
    
    @app.route('/user/name',methods=['PATCH'])
    def patchUserName():
        if request.method == 'PATCH':
            token = request.headers['Authorization']
            if not token:
                return jsonify({'result':'success','msg': '유저 정보 가져오기 실패'}) ,400
        
            body = request.json


            user_service.patch_user_name(body,token)

            return jsonify({'result':'success','msg': '유저 이름 변경'})
