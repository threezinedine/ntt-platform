package authentication

import model "nttplatform/internal/apis"

type TokenizeService interface {
	GenerateToken(user *model.User) (string, string, error)
	ValidateAccessToken(accessToken string, user *model.User) error
	Refresh(refreshToken string, user *model.User) (string, error)
}
