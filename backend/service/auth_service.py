from model.auth_model import authModel

class authService: 
    def __init__(self, authModel):
        self.auth_model = authModel 
        
    def get_all_user(self,userId):
        resurt = self.auth_model.get_user(userId)
        return resurt
