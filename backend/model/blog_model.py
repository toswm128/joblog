import pymysql
from tools.databases import dbTool
class blogModel:

    def __init__(self):
        self.db = dbTool()

    def get_blog(self,page,limit):
        db = self.db.getDB()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = '''select b1.*,u1.name, count(l1.userIdx) likesCount from blog b1 JOIN user u1 ON u1.idx = b1.userIdx LEFT JOIN likes l1 ON b1.idx = l1.blogIdx GROUP BY b1.idx order by b1.idx desc 
        Limit %s, %s'''
        cursor.execute(sql,(int(page*limit),int(limit)))
        result = cursor.fetchall()
        db.close()
        return result

    def get_board_idx(self,idx):
        db = self.db.getDB()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        blogSql = '''select * from blog where idx = %s;''' 
        commentSql = '''
            select c1.text, c1.regdate, u1.name, u1.profile  from comment c1
            JOIN user u1
            ON c1.userId = u1.idx
            where c1.blogId = %s
            order by c1.idx desc;
            ''' 
        likesSql = '''select userIdx from likes where blogIdx = %s'''
        cursor.execute(blogSql,int(idx))
        blog_data = cursor.fetchone()
        cursor.execute(commentSql,int(idx))
        comment_data = cursor.fetchall()
        cursor.execute(likesSql,int(idx))
        likes_data = cursor.fetchall()

        result = dict()
        result['blog'] = blog_data
        result['comments'] = comment_data
        result['likes'] = likes_data
        
        userSql = '''select idx, name, profile from user where idx = %s;''' 
        cursor.execute(userSql,int(result['blog']['userIdx']))
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
            (Null,%s,%s,now(),%s,%s);
            '''
        print(sql)
        cursor.execute(sql,(int(userIdx),context,title,url))
        result = cursor.fetchall()
        db.commit()
        db.close()
        return result

    def put_blog(self,context,title,url,idx):
        db = self.db.getDB()
        cursor = db.cursor()
        sql = '''
            UPDATE `joblog`.`blog` SET `context` = %s, `title` = %s, `banner` = %s WHERE (`idx` = %s);
            '''
        print(sql)
        cursor.execute(sql,(context,title,url,idx))
        result = cursor.fetchall()
        db.commit()
        db.close()
        return result

    def delete_blog(self,idx):
        db = self.db.getDB()
        cursor = db.cursor()
        sql = '''
            DELETE FROM `joblog`.`blog` WHERE (`idx` = %s);
            '''
        print(sql)
        cursor.execute(sql,(idx))
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
            (Null,%s,%s,%s,now());
            ''' 
        cursor.execute(sql,(int(blogId),int(userId),text))
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
            VALUES (null,%s,%s);'''
        cursor.execute(sql,(int(userId), int(blogId)))
        result = cursor.fetchone()
        db.commit()
        db.close()
        return result
    
    def delete_likes(self,userId,blogId):
        db = self.db.getDB()
        cursor = db.cursor()
        sql = '''
            DELETE FROM `joblog`.`likes`
            WHERE userIdx = %s and blogIdx = %s ;
            ''' 
        cursor.execute(sql,(userId, blogId))
        result = cursor.fetchone()
        db.commit()
        db.close()
        return result

    def search_blog_to_title(self,title):
        db = self.db.getDB()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = '''
            select b1.*,u1.name, count(l1.userIdx) likesCount from blog b1 JOIN user u1 ON u1.idx = b1.userIdx LEFT JOIN likes l1 ON b1.idx = l1.blogIdx 
            where b1.title like %s GROUP BY b1.idx order by b1.idx desc;
            ''' 
        cursor.execute(sql, ("%"+title+"%"))
        result = cursor.fetchall()
        db.close()
        return result


    def get_board_to_userIdx(self,userIdx,page,limit):
        db = self.db.getDB()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = '''select b1.*,u1.name, count(l1.userIdx) likesCount from blog b1 JOIN user u1 ON u1.idx = b1.userIdx LEFT JOIN likes l1 ON b1.idx = l1.blogIdx 
        where b1.userIdx = %s GROUP BY b1.idx order by b1.idx desc Limit %s, %s;''' 
        print(sql,(userIdx,page*int(limit),limit))
        cursor.execute(sql,(userIdx,page*int(limit),int(limit)))
        result = cursor.fetchall()
        db.close()
        return result
