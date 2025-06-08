package blog_repository

import blog_models "nttplatform/internal/apis/blog/models"

type Repository interface {
	GetAllBlogs() ([]blog_models.Blog, error)
	CreateBlog(blog blog_models.Blog) error
	GetBlogById(id string) (blog_models.Blog, error)
}
