from flask import request, jsonify
import jwt
import os
from werkzeug.utils import secure_filename
import uuid


def create_auth_endpoints(app, services):
    user_service  = services.authServices

    @app.route('/login',methods=['POST'])
    def login():
        if request.method == 'POST':
            value = request.json
            loginUser = user_service.try_login(value['id'],value['password'])
            if loginUser == 404:
                return jsonify({"msg":"아이디를 찾을 수 없습니다."}),404
            elif loginUser == 400:
                return jsonify({"msg":"비밀번호가 일치하지 않습니다."}),400
            else:
                return jsonify({'message':'OK!','data':loginUser}), 200
            return jsonify({"msg":"예기치 못한 오류"}),500


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
            if not token:
                return jsonify({'result':'success','msg': '유저 정보 가져오기 실패'}) ,400
            userData = user_service.get_userData(token)
            return jsonify({'result':'success','data': userData,'msg': '유저 정보 가져오기'})

    @app.route('/user/profile',methods=['PATCH'])
    def patchUserProfile():
        if request.method == 'PATCH':
            token = request.headers['Authorization']
            if not token:
                return jsonify({'result':'success','msg': '유저 정보 가져오기 실패'}) ,400

            file = request.files["profile"]
            fileName = str(uuid.uuid4())+'.'+file.filename.split('.')[1]
            file.save(os.path.join(app.config["IMAGE_UPLOADS"],fileName))
            url = "http://localhost:5000/image?file="+fileName

            user_service.patch_user_profile(url,token)
            return jsonify({'result':'success','msg': '유저 프로필 사진 변경'})
