from flask import Flask,jsonify,request
import pymysql 
from flask_cors import CORS

def get_blog():
    db = pymysql.connect(host='127.0.0.1', user='root', password='12345678', charset='utf8',db='joblog')
    cursor = db.cursor(pymysql.cursors.DictCursor)
    sql = '''SELECT * FROM blog;'''
    cursor.execute(sql)
    result = cursor.fetchall()
    db.close()
    return result

def post_blog(content):
    db = pymysql.connect(host='127.0.0.1', user='root', password='12345678', charset='utf8',db='joblog')
    cursor = db.cursor()
    sql = '''
        INSERT INTO `joblog`.`blog`
        (`idx`,
        `userIdx`,
        `context`,
        `views`,
        `likes`,
        `regdate`,
        `title`,
        `writer`)
        VALUES
        (Null,
        %d,
        '%s',
        0,
        0,
        now(),
        '%s',
        '%s');
        ''' % (content['userIdx'],content['context'],content['title'],content['writer'])
    cursor.execute(sql)
    result = cursor.fetchall()
    db.commit()
    db.close()
    return result




app = Flask(__name__)

CORS(app)


@app.route('/',methods=['GET'])
def index():
    if request.method == 'GET':
        return jsonify({'result':'success','data': get_blog(),'msg': 'blog정보 가져오기'})

@app.route('/blog/post',methods=['POST'])
def blog_post():
    if request.method == 'POST':
        value = request.json
        print(value)
        post_blog(value)
        return jsonify({'result':'success','data': get_blog(),'msg': 'blog 생성!'})

if __name__ == '__main__':
    app.run(debug=True)
    