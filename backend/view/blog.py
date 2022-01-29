from flask import request, jsonify


def create_blog_endpoints(app, services):
    blog_service  = services

    @app.route('/',methods=['GET'])
    def index():
        if request.method == 'GET':
            return jsonify({'result':'success','data': blog_service.get_Blog(),'msg': 'blog정보 가져오기'})

    @app.route('/blog/post',methods=['POST'])
    def blog_post():
        if request.method == 'POST':
            value = request.json
            blog_service.post_blog(value)
            return jsonify({'result':'success','data': blog_service.get_Blog(),'msg': 'blog 생성!'})