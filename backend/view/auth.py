from flask import request, jsonify


def create_auth_endpoints(app, services):
    user_service  = services

    @app.route('/login',methods=['POST'])
    def login_post():
        if request.method == 'POST':
            value = request.json
            return jsonify({'message':'OK!','data':value}), 200

    @app.route('/user',methods=['GET'])
    def show_all_user():
        if request.method == 'GET':
            return jsonify({'result':'success','data': user_service.get_all_user(1),'msg': '유저 정보 가져오기'})