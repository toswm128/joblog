import pymysql 

class blogModel:
    def __init__(self,database):
        self.db = database

    def get_blog(self):
        cursor = self.db.cursor(pymysql.cursors.DictCursor)
        sql = '''SELECT * FROM blog;'''
        cursor.execute(sql)
        result = cursor.fetchall()
        self.db.close()
        return result
    
    def post_blog(self,content):
        cursor = self.db.cursor()
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
        self.db.commit()
        self.db.close()
        return result
    
    def a(self):
        return "aa"