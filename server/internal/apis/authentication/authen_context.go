package authentication

import (
	model "nttplatform/internal/apis"
	"nttplatform/internal/apis/authentication/services/password"
	authentication_repository "nttplatform/internal/apis/authentication/services/repository"
	"nttplatform/internal/apis/authentication/services/tokenize"
	"nttplatform/internal/common"
)

type AuthenticationContext struct {
	Repository      authentication_repository.Repository
	TokenizeService tokenize.TokenizeService
	PasswordService password.PasswordService
	IsAuthenticated bool
	User            *model.User
}

func NewAuthenticationContext(ctx *common.Context) *AuthenticationContext {
	Repository := authentication_repository.NewSqlRepository(ctx)
	TokenizeService := tokenize.NewRealTokenizeService()
	HashPasswordService := password.NewBcryptPasswordService()

	return &AuthenticationContext{
		Repository:      Repository,
		TokenizeService: TokenizeService,
		PasswordService: HashPasswordService,
	}
}

func (c *AuthenticationContext) Init() {
}

func (c *AuthenticationContext) Close() {
	c.Repository.Close()
}
