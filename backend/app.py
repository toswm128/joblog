from flask import Flask,jsonify,request
import pymysql 
from flask_cors import CORS
from flask_bcrypt import Bcrypt

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
bcrypt = Bcrypt(app)
CORS(app)

def get_user(uid):
    db = pymysql.connect(host='127.0.0.1', user='root', password='12345678', charset='utf8',db='joblog')
    cursor = db.cursor(pymysql.cursors.DictCursor)
    sql = '''SELECT * FROM user where id="%s";''' % uid
    cursor.execute(sql)
    result = cursor.fetchall()
    db.close()
    return result


def login(loginData):
    # db = pymysql.connect(host='127.0.0.1', user='root', password='12345678', charset='utf8',db='joblog')
    # cursor = db.cursor()
    # sql = '''

    # '''
    i = get_user(loginData['id'])
    if len(i) == 0:
        return "존재하지 않는 id입니다"
    # pwd = bcrypt.generate_password_hash(loginData['password']).decode('utf-8') #암호화 후 디코딩 해서 json으로 전송 가능
    if bcrypt.check_password_hash(i[0]['password'].encode(),loginData['password']) == True:
        return "로그인 성공"
    return "로그인 실패;;"


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

@app.route('/login',methods=['POST'])
def login_post():
    if request.method == 'POST':
        value = request.json
        return jsonify({'result':'success','data': login(value),'msg': '로그인 성공!'})

if __name__ == '__main__':
    app.run(debug=True)
    