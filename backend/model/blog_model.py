import pymysql
from tools.databases import dbTool
class blogModel:

    def __init__(self):
        self.db = dbTool()

    def get_blog(self,page,limit):
        db = self.db.getDB()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = '''select b1.*,u1.name, count(l1.userIdx) likesCount from blog b1 JOIN user u1 ON u1.idx = b1.userIdx LEFT JOIN likes l1 ON b1.idx = l1.blogIdx GROUP BY b1.idx order by b1.idx desc 
        Limit %d, %d''' % (page*limit,limit)
        cursor.execute(sql)
        result = cursor.fetchall()
        db.close()
        return result

    def get_board_idx(self,idx):
        db = self.db.getDB()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        blogSql = '''select * from blog where idx = %d;''' % int(idx)
        commentSql = '''
            select c1.text, c1.regdate, u1.name, u1.profile  from comment c1
            JOIN user u1
            ON c1.userId = u1.idx
            where c1.blogId = %d
            order by c1.idx desc;
            ''' % int(idx)
        likesSql = '''select userIdx from likes where blogIdx = %d''' % int(idx)
        cursor.execute(blogSql)
        blog_data = cursor.fetchone()
        cursor.execute(commentSql)
        comment_data = cursor.fetchall()
        cursor.execute(likesSql)
        likes_data = cursor.fetchall()

        result = dict()
        result['blog'] = blog_data
        result['comments'] = comment_data
        result['likes'] = likes_data
        
        userSql = '''select idx, name, profile from user where idx = %d;''' % int(result['blog']['userIdx'])
        cursor.execute(userSql)
        user_data = cursor.fetchone()
        result['user'] = user_data
        db.close()

        return result
    
    def post_blog(self,userIdx,context,title,url):
        db = self.db.getDB()
        cursor = db.cursor()
        sql = '''
            INSERT INTO `joblog`.`blog`
            (`idx`,`userIdx`,`context`,`regdate`,`title`,`banner`)
            VALUES
            (Null,%d,'%s',now(),"%s",'%s');
            ''' % (userIdx,context,title,url)
        print(sql)
        cursor.execute(sql)
        result = cursor.fetchall()
        db.commit()
        db.close()
        return result

    def post_comment(self,blogId,userId,text):
        db = self.db.getDB()
        cursor = db.cursor()
        sql = '''
            INSERT INTO `joblog`.`comment`
            (`idx`,`blogId`,`userId`,`text`,regdate)
            VALUES
            (Null,%d,%d,'%s',now());
            ''' % (blogId,userId,text)
        cursor.execute(sql)
        result = cursor.fetchall()
        db.commit()
        db.close()
        return result
        
    def insert_likes(self,userId,blogId):
        db = self.db.getDB()
        cursor = db.cursor()
        sql = '''
            INSERT INTO `joblog`.`likes`
            (`idx`,`userIdx`,`blogIdx`)
            VALUES (null,%d,%d);''' % (userId, blogId)
        cursor.execute(sql)
        result = cursor.fetchone()
        db.commit()
        db.close()
        return result
    
    def delete_likes(self,userId,blogId):
        db = self.db.getDB()
        cursor = db.cursor()
        sql = '''
            DELETE FROM `joblog`.`likes`
            WHERE userIdx = %d and blogIdx = %d ;
            ''' % (userId, blogId)
        cursor.execute(sql)
        result = cursor.fetchone()
        db.commit()
        db.close()
        return result

    def search_blog_to_title(self,title):
        db = self.db.getDB()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = '''
            select b1.*,u1.name, count(l1.userIdx) likesCount from blog b1 JOIN user u1 ON u1.idx = b1.userIdx LEFT JOIN likes l1 ON b1.idx = l1.blogIdx 
            where b1.title like '%s' GROUP BY b1.idx order by b1.idx desc;
            ''' %  ("%"+title+"%")
        cursor.execute(sql)
        result = cursor.fetchall()
        db.close()
        return result


    def get_board_to_userIdx(self,userIdx,page,limit):
        db = self.db.getDB()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = '''select b1.*,u1.name, count(l1.userIdx) likesCount from blog b1 JOIN user u1 ON u1.idx = b1.userIdx LEFT JOIN likes l1 ON b1.idx = l1.blogIdx 
        where b1.userIdx = %s GROUP BY b1.idx order by b1.idx desc Limit %s, %s;''' % (userIdx,page*int(limit),limit)
        print(sql)
        cursor.execute(sql)
        result = cursor.fetchall()
        db.close()
        return result
