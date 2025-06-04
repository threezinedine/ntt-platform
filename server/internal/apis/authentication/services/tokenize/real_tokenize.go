package tokenize

import (
	"errors"
	model "nttplatform/internal/apis"
	"os"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt"
)

type RealTokenizeService struct {
}

func NewRealTokenizeService() *RealTokenizeService {
	return &RealTokenizeService{}
}

func (s *RealTokenizeService) generateToken(user *model.User, expTime int64) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":       user.Id,
		"username": user.Username,
		"role":     user.Role,
		"exp":      expTime,
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("ACCESS_SECRET_KEY")))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func (s *RealTokenizeService) GenerateToken(user *model.User) (string, string, error) {
	minutes, err := strconv.Atoi(os.Getenv("ACCESS_TOKEN_EXP_IN_MINUTES"))
	if err != nil {
		minutes = 15 // Default to 15 minutes if parsing fails
	}
	expTime := time.Now().Add(time.Minute * time.Duration(minutes)).Unix()

	accessToken, err := s.generateToken(user, expTime)
	if err != nil {
		return "", "", err
	}

	minutes, err = strconv.Atoi(os.Getenv("REFRESH_TOKEN_EXP_IN_MINUTES"))
	if err != nil {
		minutes = 7 * 24 * 60 // Default to 7 days if parsing fails
	}
	refreshExpTime := time.Now().Add(time.Minute * time.Duration(minutes)).Unix()

	refreshToken, err := s.generateToken(user, refreshExpTime)
	if err != nil {
		return "", "", err
	}

	return accessToken, refreshToken, nil
}
func (s *RealTokenizeService) ValidateAccessToken(token string) (string, error) {
	parsedToken, err := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("ACCESS_SECRET_KEY")), nil
	})

	if err != nil {
		return "", err
	}

	claims, ok := parsedToken.Claims.(jwt.MapClaims)
	if !ok || !parsedToken.Valid {
		return "", errors.New("invalid token")
	}

	return claims["id"].(string), nil
}

func (s *RealTokenizeService) Refresh(refreshToken string, user *model.User) (string, error) {
	_, err := jwt.Parse(refreshToken, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("REFRESH_SECRET_KEY")), nil
	})

	if err != nil {
		return "", err
	}

	newAccessToken, err := s.generateToken(user, time.Now().Add(time.Minute*15).Unix())

	if err != nil {
		return "", err
	}

	return newAccessToken, nil
}
