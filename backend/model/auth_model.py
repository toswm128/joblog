import pymysql 

class authModel:
    def __init__(self, database):
        self.db = database

    def get_user(self,userId):
        cursor = self.db.cursor(pymysql.cursors.DictCursor)
        sql = '''SELECT * FROM user where idx="%s";''' % userId
        print(sql)
        cursor.execute(sql)
        result = cursor.fetchall()
        self.db.close()
        return result
        