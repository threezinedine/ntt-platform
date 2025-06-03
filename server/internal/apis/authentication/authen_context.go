package authentication

import "nttplatform/internal/common"

type AuthenticationContext struct {
	Repository      IRepository
	TokenizeService TokenizeService
}

func NewAuthenticationContext(ctx *common.Context) *AuthenticationContext {
	Repository := NewSqlRepository(ctx)
	TokenizeService := NewMockTokenizeService()

	return &AuthenticationContext{
		Repository:      Repository,
		TokenizeService: TokenizeService,
	}
}

func (c *AuthenticationContext) Init() {
}

func (c *AuthenticationContext) Close() {
	c.Repository.Close()
}
