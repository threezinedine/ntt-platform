package authentication

import model "nttplatform/internal/apis"

type MockTokenizeService struct {
	AccessToken  string
	RefreshToken string
}

func NewMockTokenizeService() *MockTokenizeService {
	return &MockTokenizeService{
		AccessToken:  "test-access-token",
		RefreshToken: "test-refresh-token",
	}
}

func (s *MockTokenizeService) GenerateToken(user *model.User) (string, string, error) {
	return s.AccessToken, s.RefreshToken, nil
}

func (s *MockTokenizeService) ValidateAccessToken(accessToken string, user *model.User) error {
	return nil
}

func (s *MockTokenizeService) Refresh(refreshToken string) (string, string, error) {
	return s.AccessToken, s.RefreshToken, nil
}

func (s *MockTokenizeService) SetTokens(accessToken string, refreshToken string) {
	s.AccessToken = accessToken
	s.RefreshToken = refreshToken
}
