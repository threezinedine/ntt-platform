package blog

import blog_repository "nttplatform/internal/apis/blog/services/repository"

type BlogContext struct {
	Repository blog_repository.Repository
}

func NewBlogContext() *BlogContext {
	return &BlogContext{}
}

func (c *BlogContext) Init() {

}

func (c *BlogContext) Close() {

}
