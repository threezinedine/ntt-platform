package blog

import (
	blog_models "nttplatform/internal/apis/blog/models"
	"time"
)

type BlogResponse struct {
	ID          string    `json:"id"`
	AuthorID    string    `json:"author_id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Content     string    `json:"content"`
	UpdatedAt   time.Time `json:"updated_at"`
}

func FromModel(blog blog_models.Blog) BlogResponse {
	return BlogResponse{
		ID:          blog.ID,
		AuthorID:    blog.AuthorID,
		Title:       blog.Title,
		Description: blog.Description,
		Content:     blog.Content,
		UpdatedAt:   blog.UpdatedAt,
	}
}
