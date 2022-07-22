import pymysql 
from tools.databases import dbTool

class authModel:

    def __init__(self):
        self.db = dbTool()

    def get_user_to_id(self,userId):
        db = self.db.getDB()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = '''SELECT * FROM user where id="%s";''' % userId
        cursor.execute(sql)
        result = cursor.fetchone()
        db.close()
        return result

    def insert_user(self,userData,url):
        db = self.db.getDB()
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

    def get_user_to_idx(self,userIdx):
        db = self.db.getDB()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = '''SELECT * FROM user where idx="%s";''' % userIdx
        cursor.execute(sql)
        result = cursor.fetchone()
        db.close()
        return result

    def patch_user_profile(self,url,userIdx):
        db = self.db.getDB()
        cursor = db.cursor()
        sql = '''UPDATE user SET `profile` = '%s' WHERE (`idx` = %s);''' % (url,userIdx)
        cursor.execute(sql)
        db.commit()
        db.close()

    
    def patch_user_name(self,name,userIdx):
        db = self.db.getDB()
        cursor = db.cursor()
        sql = '''UPDATE user SET `name` = '%s' WHERE (`idx` = %s);''' % (name,userIdx)
        cursor.execute(sql)
        db.commit()
        db.close()
