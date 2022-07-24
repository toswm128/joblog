from model.auth_model import authModel
from tools.token import tokenTool
import jwt 
import bcrypt


class authService: 
    def __init__(self, authModel):
        self.auth_model = authModel
        self.tools = tokenTool() 
        
    def try_login(self,userId,userPwd):
        resurt = self.auth_model.get_user_to_id(userId)
        if resurt:
            # pp= bcrypt.hashpw(userPwd.encode("utf-8"), bcrypt.gensalt())
            if bcrypt.checkpw(userPwd.encode('utf-8'),resurt['password'].encode('utf-8')):
                # print(pp,pp.decode('utf-8'))
                return {"token":jwt.encode(resurt,"fromis", algorithm="HS256"),"idx":resurt["idx"],"name":resurt["name"],"profile":resurt["profile"]}
            return 400
        return 404

    def try_join(self,userData):
        if userData['id'] and userData['password'] and userData['name']:
            userData['password'] = bcrypt.hashpw(userData['password'].encode("utf-8"), bcrypt.gensalt()).decode('utf-8')
            url = "http://joblog.kro.kr:5000/image?file=user.png"
            resurt = self.auth_model.insert_user(userData,url)
            return resurt
        else:
            return 400

    def get_my_info(self,token):
        userIdx = self.tools.get_data(token)['idx']
        user = self.auth_model.get_user_to_idx(userIdx)
        return {"idx":user["idx"],"id":user["id"],"name":user["name"],"profile":user["profile"]}

    def get_user_info(self,userIdx):
        user = self.auth_model.get_user_to_idx(userIdx)
        return {"idx":user["idx"],"id":user["id"],"name":user["name"],"profile":user["profile"]}


    def patch_user_profile(self,url,token):
        if url:
            userIdx = self.tools.get_data(token)['idx']
            self.auth_model.patch_user_profile(url,userIdx)
            return 

    def patch_user_name(self,body,token):
        if body['name']:
            userIdx = self.tools.get_data(token)['idx']
            self.auth_model.patch_user_name(body['name'],userIdx)
            return 