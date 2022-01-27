import auth
import blog

def create_endpoints(app,services):
    auth.create_auth_endpoints(app,services)
    blog.create_blog_endpoints(app,services)