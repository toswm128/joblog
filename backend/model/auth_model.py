import pymysql 

class authModel:
    def __init__(self, database):
        self.db = database

    def get_user_to_id(self,userId):
        db = pymysql.connect(host='127.0.0.1', user='root', password='12345678', charset='utf8',db='joblog')
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = '''SELECT * FROM user where id="%s";''' % userId
        cursor.execute(sql)
        result = cursor.fetchone()
        db.close()
        return result

    def insert_user(self,userData,url):
        db = pymysql.connect(host='127.0.0.1', user='root', password='12345678', charset='utf8',db='joblog')
        cursor = db.cursor()
        sql = '''
        INSERT INTO `joblog`.`user`
        (`idx`,`id`,`password`,`name`,`profile`)
        VALUES
        (Null,'%s','%s','%s','%s');
        ''' % (userData['id'],userData['password'],userData['name'],url)
        cursor.execute(sql)
        result = cursor.fetchall()
        db.commit()
        db.close()
        return result