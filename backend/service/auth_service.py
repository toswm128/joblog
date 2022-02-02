from model.auth_model import authModel
import jwt 
import bcrypt


class authService: 
    def __init__(self, authModel):
        self.auth_model = authModel 
        
    def try_login(self,userId,userPwd):
        resurt = self.auth_model.get_user_to_id(userId)
        if resurt:
            # pp= bcrypt.hashpw(userPwd.encode("utf-8"), bcrypt.gensalt())
            if bcrypt.checkpw(userPwd.encode('utf-8'),resurt['password'].encode('utf-8')):
                # print(pp,pp.decode('utf-8'))
                return jwt.encode(resurt,"fromis", algorithm="HS256")
            return 400
        return 404

    def try_join(self,userData):
        userData['password'] = bcrypt.hashpw(userData['password'].encode("utf-8"), bcrypt.gensalt()).decode('utf-8')
        resurt = self.auth_model.insert_user(userData)
        return resurt