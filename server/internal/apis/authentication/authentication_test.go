package authentication

import (
	"net/http"
	model "nttplatform/internal/apis"
	"nttplatform/internal/apis/authentication/services/password"
	authentication_repository "nttplatform/internal/apis/authentication/services/repository"
	"nttplatform/internal/apis/authentication/services/tokenize"
	"nttplatform/internal/common"
	"nttplatform/internal/utils"
	"testing"

	"github.com/stretchr/testify/assert"
)

func newTestFixture(id string) *common.Context {
	context := common.Context{
		Logger:    common.NewNoLogger(),
		IdService: &common.MockIDService{Id: id},
	}

	authContext := &AuthenticationContext{}
	authContext.Repository = authentication_repository.NewInMemoryRepository()
	authContext.PasswordService = password.NewBcryptPasswordService()
	authContext.TokenizeService = tokenize.NewMockTokenizeService()

	authContext.TokenizeService.(*tokenize.MockTokenizeService).UserId = id

	context.AddSubContext("authentication", authContext)

	return &context
}

func TestLoginWithoutUser(t *testing.T) {
	context := newTestFixture("test-user-id")

	loginReq := LoginRequest{
		Username: "testuser",
		Password: "testpassword",
	}

	writer, request := utils.CreateRequestT(t, http.MethodPost, "/login", loginReq)
	LoginHandler(context, writer, request, &loginReq)

	assert.Equal(t, http.StatusNotFound, writer.Code)
}

func TestRegisterUser(t *testing.T) {
	context := newTestFixture("test-user-id")

	registerReq := RegisterRequest{
		Username: "testuser",
		Password: "testpassword",
	}
	writer, request := utils.CreateRequestT(t, http.MethodPost, "/register", registerReq)
	RegisterHandler(context, writer, request, &registerReq)

	assert.Equal(t, http.StatusCreated, writer.Code)

	loginReq := LoginRequest(registerReq)
	writer, request = utils.CreateRequestT(t, http.MethodPost, "/login", loginReq)
	LoginHandler(context, writer, request, &loginReq)

	assert.Equal(t, http.StatusOK, writer.Code)

	response := utils.GetResponse[LoginResponse](t, writer)
	assert.NotEmpty(t, response.AccessToken)
	assert.NotEmpty(t, response.RefreshToken)

	// use access token to get user info
	writer, request = utils.CreateRequest(t, http.MethodGet, "/user")
	request.Header.Set("Authorization", response.AccessToken)
	AuthenticationMiddleware(GetUserInfoHandler)(context, writer, request)

	assert.Equal(t, http.StatusOK, writer.Code)
	user := utils.GetResponse[model.VisualUser](t, writer)
	assert.Equal(t, registerReq.Username, user.Username)
}

func TestRequestUserInfoWithoutAccessToken(t *testing.T) {
	context := newTestFixture("test-user-id")

	writer, request := utils.CreateRequest(t, http.MethodGet, "/user")
	AuthenticationMiddleware(GetUserInfoHandler)(context, writer, request)

	assert.Equal(t, http.StatusUnauthorized, writer.Code)
}

func TestRequestUserInfoWithInvalidAccessToken(t *testing.T) {
	context := newTestFixture("test-user-id")

	writer, request := utils.CreateRequest(t, http.MethodGet, "/user")
	request.Header.Set("Authorization", "invalid-access-token")
	AuthenticationMiddleware(GetUserInfoHandler)(context, writer, request)
}

func TestLoginWithInvalidPassword(t *testing.T) {
	context := newTestFixture("test-user-id")

	registerUser := RegisterRequest{
		Username: "testuser",
		Password: "testpassword",
	}

	writer, request := utils.CreateRequestT(t, http.MethodPost, "/register", registerUser)
	RegisterHandler(context, writer, request, &registerUser)

	loginUser := LoginRequest{
		Username: "testuser",
		Password: "invalidpassword",
	}

	writer, request = utils.CreateRequestT(t, http.MethodPost, "/login", loginUser)
	LoginHandler(context, writer, request, &loginUser)

	assert.Equal(t, http.StatusUnauthorized, writer.Code)
}
