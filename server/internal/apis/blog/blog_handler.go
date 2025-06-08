package blog

import (
	"encoding/json"
	"net/http"
	"nttplatform/internal/apis/authentication"
	blog_models "nttplatform/internal/apis/blog/models"
	"nttplatform/internal/common"
	"time"
)

func GetAllBlogsHandler(ctx *common.Context, w http.ResponseWriter, r *http.Request) {
	blogContext := ctx.GetSubContext("blog").(*BlogContext)

	blogs, err := blogContext.Repository.GetAllBlogs()

	if err != nil {
		ctx.Logger.Error("Failed to get all blogs", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	w.WriteHeader(http.StatusOK)
	response := []BlogResponse{}
	for _, blog := range blogs {
		response = append(response, FromModel(blog))
	}
	json.NewEncoder(w).Encode(response)
}

func AddNewBlogHandler(ctx *common.Context, w http.ResponseWriter, r *http.Request) {
	authenticationContext := ctx.GetSubContext("authentication").(*authentication.AuthenticationContext)
	blogContext := ctx.GetSubContext("blog").(*BlogContext)

	newBlog := blog_models.Blog{
		ID:          ctx.IdService.GenerateId(),
		AuthorID:    authenticationContext.User.Id,
		Title:       "Test Blog",
		Description: "Test Description",
		Content:     "Test Content",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	err := blogContext.Repository.CreateBlog(newBlog)

	if err != nil {
		ctx.Logger.Error("Failed to create blog", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func GetBlogByIdHandler(ctx *common.Context, w http.ResponseWriter, r *http.Request) {
	blogContext := ctx.GetSubContext("blog").(*BlogContext)

	blogId := r.URL.Query().Get("id")

	blog, err := blogContext.Repository.GetBlogById(blogId)

	if err != nil {
		ctx.Logger.Error("Failed to get blog by id", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(FromModel(blog))
}
