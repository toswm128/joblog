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
    def put_blog(self,value,url,token):
        userIdx = self.tools.get_data(token)['idx']
        if userIdx and value['context'] and value['title'] and url:
            context = value['context']
            title = value['title']
            idx = value['idx']
            blog = self.blog_model.put_blog(context,title,url,idx)
            return blog
        else:
            return 400
    def delete_blog(self,value,token):
        userIdx = self.tools.get_data(token)['idx']
        if userIdx and value['idx']:
            idx = value['idx']
            blog = self.blog_model.delete_blog(idx)
            return blog
        else:
            return 400

    def get_Blog(self,page,limit):
        new_page = int(page)
        blog = self.blog_model.get_blog(new_page,int(limit))
        isEnd = False
        if len(blog) < int(limit):
            isEnd = True
        return {"data":blog,"isEnd":isEnd}

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
    
    def post_search(self,title):
        if title:
            blog = self.blog_model.search_blog_to_title(title)
            if len(blog) == 0:
                return 404
            return blog
        else:
            return 400
    
    def get_my_board(self,token,page,limit):
        userIdx = self.tools.get_data(token)['idx']
        userBoard = self.blog_model.get_board_to_userIdx(userIdx,page,limit)
        isEnd = False
        if len(userBoard) < int(limit):
            isEnd = True
        return {"data":userBoard,"isEnd":isEnd}

    def get_ussr_board(self,userIdx,page,limit):
        userBoard = self.blog_model.get_board_to_userIdx(userIdx,page,limit)
        isEnd = False
        if len(userBoard) < int(limit):
            isEnd = True
        return {"data":userBoard,"isEnd":isEnd}
            