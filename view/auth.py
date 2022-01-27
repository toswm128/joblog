from flask import request, jsonify


def create_auth_endpoints(app, services):
    user_service  = services.user_service

    @app.route('/login',methods=['POST'])
    def login_post():
        if request.method == 'POST':
            value = request.json
            return jsonify({'message':'OK!','data':value}), 200