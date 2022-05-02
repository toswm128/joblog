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

    def get_board_idx(self,idx,userIdx):
        cursor = self.db.cursor(pymysql.cursors.DictCursor)
        blogSql = '''select * from blog where idx = %d;''' % int(idx)
        commentSql = '''
            select c1.text, u1.name, u1.profile  from comment c1
            JOIN user u1
            ON c1.userId = u1.idx
            where c1.blogId = %d;
            ''' % int(idx)
        userSql = '''select name, profile from user where idx = %d;''' % int(userIdx)
        cursor.execute(blogSql)
        blog_data = cursor.fetchone()
        cursor.execute(commentSql)
        comment_data = cursor.fetchall()
        cursor.execute(userSql)
        user_data = cursor.fetchone()

        result = dict()
        result['blog'] = blog_data
        result['comments'] = comment_data
        result['user'] = user_data
        print(result)

        return result
    
    def post_blog(self,userIdx,context,title,url):
        cursor = self.db.cursor()
        sql = '''
            INSERT INTO `joblog`.`blog`
            (`idx`,`userIdx`,`context`,`regdate`,`title`,`banner`)
            VALUES
            (Null,%d,'%s',now(),'%s','%s');
            ''' % (userIdx,context,title,url)
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

    