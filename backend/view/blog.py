from flask import request, jsonify


def create_blog_endpoints(app, services):
    blog_service  = services.blogServices

    @app.route('/',methods=['GET'])
    def index():
        if request.method == 'GET':
            return jsonify({'result':'success','data': blog_service.get_Blog(),'msg': 'blog정보 가져오기'})

    @app.route('/blog/post',methods=['POST'])
    def blogPost():
        if request.method == 'POST':
            value = request.json
            blog_service.post_blog(value)
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