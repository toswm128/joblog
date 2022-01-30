import pymysql 

class authModel:
    def __init__(self, database):
        self.db = database

    def get_user_to_id(self,userId):
        cursor = self.db.cursor(pymysql.cursors.DictCursor)
        sql = '''SELECT * FROM user where id="%s";''' % userId
        cursor.execute(sql)
        result = cursor.fetchone()
        print(sql,result)
        return result