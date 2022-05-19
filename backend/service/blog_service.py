from model.blog_model import blogModel
from tools.token import tokenTool

class blogService: 
    def __init__(self, blogModel):
        self.blog_model = blogModel 
        self.tools = tokenTool()
        
    def post_new_blog(self, value,url,token):
        userIdx = self.tools.get_data(token)['idx']
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
    def get_select_board(self,idx):
        blog = self.blog_model.get_board_idx(idx)
        return blog

    def post_comment(self,data,token):
        userId = self.tools.get_data(token)['idx']
        if data['blogId'] and userId and data['text']:
            blogId = data['blogId']
            text = data['text']
            blog = self.blog_model.post_comment(blogId,userId,text)
            return blog
        else:
            return 400
    def post_likes(self,data,token):
        userId = self.tools.get_data(token)['idx']
        if data['blogId'] and userId:
            blogId = data['blogId']
            if data['isLike']:
                blog = self.blog_model.delete_likes(userId,blogId)
            else:
                blog = self.blog_model.insert_likes(userId,blogId)
            return blog
            