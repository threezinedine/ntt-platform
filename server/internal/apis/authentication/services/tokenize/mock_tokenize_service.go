package tokenize

import (
	"errors"
	model "nttplatform/internal/apis"
)

type MockTokenizeService struct {
	AccessToken  string
	RefreshToken string
	UserId       string
}

func NewMockTokenizeService() *MockTokenizeService {
	return &MockTokenizeService{
		AccessToken:  "test-access-token",
		RefreshToken: "test-refresh-token",
		UserId:       "test-user-id",
	}
}

func (s *MockTokenizeService) GenerateToken(user *model.User) (string, string, error) {
	return s.AccessToken, s.RefreshToken, nil
}

func (s *MockTokenizeService) ValidateAccessToken(accessToken string) (string, error) {
	if accessToken != s.AccessToken {
		return "", errors.New("invalid access token")
	}
	return s.UserId, nil
}

func (s *MockTokenizeService) ValidateRefreshToken(refreshToken string) (string, error) {
	if refreshToken != s.RefreshToken {
		return "", errors.New("invalid refresh token")
	}
	return s.UserId, nil
}

func (s *MockTokenizeService) Refresh(refreshToken string, user *model.User) (string, error) {
	return s.AccessToken, nil
}

func (s *MockTokenizeService) SetTokens(accessToken string, refreshToken string) {
	s.AccessToken = accessToken
	s.RefreshToken = refreshToken
}
