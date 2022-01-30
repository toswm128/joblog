from model.auth_model import authModel

class authService: 
    def __init__(self, authModel):
        self.auth_model = authModel 
        
    def try_login(self,userId):
        resurt = self.auth_model.get_user_to_id(userId)
        return resurt
