from flask import request, jsonify
import jwt


def create_auth_endpoints(app, services):
    user_service  = services.authServices

    @app.route('/login',methods=['POST'])
    def loginPost():
        if request.method == 'POST':
            value = request.json
            loginUser = user_service.try_login(value['id'])


            # if loginUser:
            #     loginUser
            return jsonify({'message':'OK!','data':loginUser}), 200
            # return jsonify({'message':'I cant find user to this one!'}), 404

    @app.route('/user',methods=['GET'])
    def getUserToId():
        if request.method == 'GET':
            return jsonify({'result':'success','data': user_service.try_login('minsu10'),'msg': '유저 정보 가져오기'})