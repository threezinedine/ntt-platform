package blog

import (
	"fmt"
	"net/http"
	model "nttplatform/internal/apis"
	"nttplatform/internal/apis/authentication"
	authentication_repository "nttplatform/internal/apis/authentication/services/repository"
	blog_repository "nttplatform/internal/apis/blog/services/repository"
	"nttplatform/internal/common"
	"nttplatform/internal/utils"
	"testing"

	"github.com/stretchr/testify/assert"
)

func createTestContext() *common.Context {
	ctx := common.Context{
		Logger:      &common.LogrusLogger{},
		SubContexts: make(map[string]common.SubContext),
		IdService:   &common.UUIDService{},
	}

	authenticationContext := authentication.AuthenticationContext{
		Repository: authentication_repository.NewInMemoryRepository(),
		User: &model.User{
			Id: ctx.IdService.GenerateId(),
		},
	}
	blogContext := BlogContext{
		Repository: blog_repository.NewInMemoryRepository(),
	}

	ctx.AddSubContext("authentication", &authenticationContext)
	ctx.AddSubContext("blog", &blogContext)

	return &ctx
}

func TestGetAllBlogsHandler(t *testing.T) {
	ctx := createTestContext()

	w, r := utils.CreateRequest(t, http.MethodGet, "/blogs")

	GetAllBlogsHandler(ctx, w, r)

	assert.Equal(t, http.StatusOK, w.Code)
	response := utils.GetResponse[[]BlogResponse](t, w)
	assert.Equal(t, 0, len(response))
}

func TestAddNewBlogHandler(t *testing.T) {
	ctx := createTestContext()

	w, r := utils.CreateRequestT(t, http.MethodPost, "blogs", CreateBlogRequest{
		Title:       "Test Blog",
		Description: "Test Description",
		Content:     "Test Content",
	})

	AddNewBlogHandler(ctx, w, r)

	assert.Equal(t, http.StatusCreated, w.Code)

	w, r = utils.CreateRequest(t, http.MethodGet, "/blogs")

	GetAllBlogsHandler(ctx, w, r)

	response := utils.GetResponse[[]BlogResponse](t, w)
	assert.Equal(t, 1, len(response))
	assert.Equal(t, "Test Blog", response[0].Title)
	assert.Equal(t, "Test Description", response[0].Description)
	assert.Equal(t, "Test Content", response[0].Content)
}

func TestGetBlogByIdHandler(t *testing.T) {
	ctx := createTestContext()

	w, r := utils.CreateRequestT(t, http.MethodPost, "blogs", CreateBlogRequest{
		Title:       "Test Blog",
		Description: "Test Description",
		Content:     "Test Content",
	})

	AddNewBlogHandler(ctx, w, r)
	assert.Equal(t, http.StatusCreated, w.Code)

	w, r = utils.CreateRequest(t, http.MethodGet, "blogs")
	GetAllBlogsHandler(ctx, w, r)

	response := utils.GetResponse[[]BlogResponse](t, w)
	blogId := response[0].ID

	w, r = utils.CreateRequest(t, http.MethodGet, fmt.Sprintf("/blogs/%s", blogId))

	GetBlogByIdHandler(ctx, w, r)

	assert.Equal(t, http.StatusOK, w.Code)
}
