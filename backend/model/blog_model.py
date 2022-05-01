import pymysql 

class blogModel:
    def __init__(self,database):
        self.db = database

    def get_blog(self):
        cursor = self.db.cursor(pymysql.cursors.DictCursor)
        sql = '''SELECT * FROM blog;'''
        cursor.execute(sql)
        result = cursor.fetchall()
        return result

    def get_board_idx(self,idx):
        cursor = self.db.cursor(pymysql.cursors.DictCursor)
        sql = '''SELECT * FROM blog where idx=%d;''' % int(idx)
        cursor.execute(sql)
        result = cursor.fetchone()
        return result
    
    def post_blog(self,value,url):
        cursor = self.db.cursor()
        sql = '''
            INSERT INTO `joblog`.`blog`
            (`idx`,`userIdx`,`context`,`views`,`likes`,`regdate`,`title`,`writer`,`banner`)
            VALUES
            (Null,%d,'%s',0,0,now(),'%s','%s','%s');
            ''' % (int(value['userIdx']),value['context'],value['title'],value['writer'],url)
        cursor.execute(sql)
        result = cursor.fetchall()
        self.db.commit()
        return result

    def post_comment(self,blogId,userId,text):
        cursor = self.db.cursor()
        sql = '''
            INSERT INTO `joblog`.`comment`
            (`idx`,`blogId`,`userId`,`text`)
            VALUES
            (Null,%d,%d,'%s');
            ''' % (blogId,userId,text)
        cursor.execute(sql)
        result = cursor.fetchall()
        self.db.commit()
        return result

    