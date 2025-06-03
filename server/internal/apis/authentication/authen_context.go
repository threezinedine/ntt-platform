package authentication

import "nttplatform/internal/common"

type AuthenticationContext struct {
	Repository      IRepository
	TokenizeService TokenizeService
	PasswordService PasswordService
}

func NewAuthenticationContext(ctx *common.Context) *AuthenticationContext {
	Repository := NewSqlRepository(ctx)
	TokenizeService := NewMockTokenizeService()
	HashPasswordService := NewBcryptPasswordService()

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
