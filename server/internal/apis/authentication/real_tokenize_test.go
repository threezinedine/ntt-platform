package authentication

import (
	model "nttplatform/internal/apis"
	"os"
	"testing"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/stretchr/testify/assert"
)

func TestGenerateToken(t *testing.T) {
	user := &model.User{
		Id:       "test-id",
		Username: "testuser",
		Role:     "admin",
	}

	tokenizeService := &RealTokenizeService{}

	accessToken, refreshToken, err := tokenizeService.GenerateToken(user)

	assert.NoError(t, err)
	assert.NotEmpty(t, accessToken)
	assert.NotEmpty(t, refreshToken)

	// access token is currently valid now
	userId, err := tokenizeService.ValidateAccessToken(accessToken)

	assert.NoError(t, err)
	assert.Equal(t, user.Id, userId)
}

func TestInvalidTokenRefresing(t *testing.T) {
	user := &model.User{
		Id:       "test-id",
		Username: "testuser",
		Role:     "admin",
	}

	tokenizeService := &RealTokenizeService{}

	_, refreshToken, err := tokenizeService.GenerateToken(user)

	// generate expired access token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":       user.Id,
		"username": user.Username,
		"role":     user.Role,
		"exp":      time.Now().Add(-time.Minute * 1).Unix(),
	})

	accessToken, _ := token.SignedString([]byte(os.Getenv("ACCESS_SECRET_KEY")))

	assert.NoError(t, err)
	assert.NotEmpty(t, refreshToken)

	_, err = tokenizeService.ValidateAccessToken(accessToken)

	assert.NotNil(t, err) // access token is expired

	accessToken, err = tokenizeService.Refresh(refreshToken, user) // refresh token is valid

	assert.NoError(t, err)          // refresh token is valid
	assert.NotEmpty(t, accessToken) // new access token is generated

	userId, err := tokenizeService.ValidateAccessToken(accessToken) // revalidated access token

	assert.NoError(t, err)           // revalidated access token is valid
	assert.Equal(t, user.Id, userId) // revalidated access token is for the same user
}

func TestExpiredRefreshToken(t *testing.T) {
	user := &model.User{
		Id:       "test-id",
		Username: "testuser",
		Role:     "admin",
	}

	tokenizeService := &RealTokenizeService{}

	// generate expired access token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":       user.Id,
		"username": user.Username,
		"role":     user.Role,
		"exp":      time.Now().Add(-time.Minute * 1).Unix(),
	})

	accessToken, _ := token.SignedString([]byte(os.Getenv("ACCESS_SECRET_KEY")))

	_, err := tokenizeService.ValidateAccessToken(accessToken)

	assert.NotNil(t, err) // access token is expired

	// generate expired refresh token
	token = jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":       user.Id,
		"username": user.Username,
		"role":     user.Role,
		"exp":      time.Now().Add(-time.Minute * 1).Unix(),
	})

	refreshToken, _ := token.SignedString([]byte(os.Getenv("REFRESH_SECRET_KEY")))

	_, err = tokenizeService.Refresh(refreshToken, user)

	assert.NotNil(t, err) // refresh token is expired
}
