from model.blog_model import blogModel

class blogService: 
    def __init__(self, blogModel):
        self.blog_model = blogModel 
        
    def post_new_blog(self, contents):  
        blog = self.blog_model.post_blog(contents)
        return blog

    def get_Blog(self):
        blog = self.blog_model.get_blog()
        return blog
