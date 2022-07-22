import pymysql 

class dbTool:
    def getDB(self):
        db = pymysql.connect(host='joblog.kro.kr', user='joblog', password='12345678', charset='utf8',db='joblog')
        return db