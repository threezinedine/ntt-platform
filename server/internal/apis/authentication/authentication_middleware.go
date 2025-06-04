package authentication

import (
	"net/http"
	"nttplatform/internal/common"
)

func AuthenticationMiddleware(handler common.HandlerFunc) common.HandlerFunc {
	return func(ctx *common.Context, w http.ResponseWriter, r *http.Request) {
		authContext := ctx.GetSubContext("authentication").(*AuthenticationContext)

		accessToken := r.Header.Get("Authorization")
		if accessToken == "" {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("Unauthorized"))
			return
		}

		userId, err := authContext.TokenizeService.ValidateAccessToken(accessToken)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("Unauthorized"))
			return
		}

		user, err := authContext.Repository.GetUserById(userId)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte(err.Error()))
			return
		}

		authContext.IsAuthenticated = true
		authContext.User = user

		handler(ctx, w, r)
	}
}
