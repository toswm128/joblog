from flask import request, jsonify
import jwt


def create_auth_endpoints(app, services):
    user_service  = services.authServices

    @app.route('/login',methods=['POST'])
    def loginPost():
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
            print("토큰:",token)
            if(token == ""):
                return jsonify({'result':'success','msg': '유저 정보 가져오기 실패'}) ,400
            userData = user_service.get_userData(token)
            return jsonify({'result':'success','data': userData,'msg': '유저 정보 가져오기'})
