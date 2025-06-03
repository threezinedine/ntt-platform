package authentication

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"nttplatform/internal/common"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestLoginWithoutUser(t *testing.T) {
	context := common.Context{
		Logger: common.NewNoLogger(),
	}

	authContext := &AuthenticationContext{}
	authContext.Repository = NewInMemoryRepository()

	context.AddSubContext("authentication", authContext)

	loginReq := LoginRequest{
		Username: "testuser",
		Password: "testpassword",
	}

	jsonData, err := json.Marshal(loginReq)
	assert.NoError(t, err)

	writer := httptest.NewRecorder()
	request, err := http.NewRequest(http.MethodPost, "/login", bytes.NewBuffer(jsonData))
	assert.NoError(t, err)

	request.Header.Set("Content-Type", "application/json")

	LoginHandler(&context, writer, request, &loginReq)

	assert.Equal(t, http.StatusNotFound, writer.Code)
}

func TestRegisterUser(t *testing.T) {
	context := common.Context{
		Logger:    common.NewNoLogger(),
		IdService: &common.UUIDService{},
	}

	authContext := &AuthenticationContext{}
	authContext.Repository = NewInMemoryRepository()
	authContext.PasswordService = NewBcryptPasswordService()
	authContext.TokenizeService = NewMockTokenizeService()

	context.AddSubContext("authentication", authContext)

	registerReq := RegisterRequest{
		Username: "testuser",
		Password: "testpassword",
	}

	jsonData, err := json.Marshal(registerReq)
	assert.NoError(t, err)

	writer := httptest.NewRecorder()
	request, err := http.NewRequest(http.MethodPost, "/register", bytes.NewBuffer(jsonData))
	assert.NoError(t, err)

	request.Header.Set("Content-Type", "application/json")

	RegisterHandler(&context, writer, request, &registerReq)

	assert.Equal(t, http.StatusCreated, writer.Code)

	loginReq := LoginRequest(registerReq)

	jsonData, err = json.Marshal(loginReq)
	assert.NoError(t, err)

	loginWriter := httptest.NewRecorder()
	loginRequest, err := http.NewRequest(http.MethodPost, "/login", bytes.NewBuffer(jsonData))
	assert.NoError(t, err)

	loginRequest.Header.Set("Content-Type", "application/json")

	LoginHandler(&context, loginWriter, loginRequest, &loginReq)

	assert.Equal(t, http.StatusOK, loginWriter.Code)
}
