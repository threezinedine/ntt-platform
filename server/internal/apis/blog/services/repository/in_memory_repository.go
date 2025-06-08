package blog_repository

import (
	"errors"
	blog_models "nttplatform/internal/apis/blog/models"
)

type InMemoryRepository struct {
	blogs []blog_models.Blog
}

func NewInMemoryRepository() *InMemoryRepository {
	repo := InMemoryRepository{}
	repo.blogs = []blog_models.Blog{}
	return &repo
}

func (r *InMemoryRepository) GetAllBlogs() ([]blog_models.Blog, error) {
	return r.blogs, nil
}

func (r *InMemoryRepository) CreateBlog(blog blog_models.Blog) error {
	r.blogs = append(r.blogs, blog)
	return nil
}

func (r *InMemoryRepository) GetBlogById(id string) (blog_models.Blog, error) {
	for _, blog := range r.blogs {
		if blog.ID == id {
			return blog, nil
		}
	}
	return blog_models.Blog{}, errors.New("blog not found")
}
