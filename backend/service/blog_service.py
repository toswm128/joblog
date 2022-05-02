from model.blog_model import blogModel
from tools.token import tokenTool

class blogService: 
    def __init__(self, blogModel):
        self.blog_model = blogModel 
        self.tools = tokenTool()
        
    def post_new_blog(self, value,url,token):
        userIdx = self.tools.get_data(token)['idx']
        print(userIdx)
        if userIdx and value['context'] and value['title'] and url:
            context = value['context']
            title = value['title']
            blog = self.blog_model.post_blog(userIdx,context,title,url)
            return blog
        else:
            return 400

    def get_Blog(self):
        blog = self.blog_model.get_blog()
        return blog
    def get_select_board(self,idx,token):
        userIdx = self.tools.get_data(token)['idx']
        blog = self.blog_model.get_board_idx(idx,userIdx)
        return blog

    def post_comment(self,data):
        if data['blogId'] and data['userId'] and data['text']:
            blogId = data['blogId']
            userId = data['userId']
            text = data['text']
            blog = self.blog_model.post_comment(blogId,userId,text)
            return blog
        else:
            return 400