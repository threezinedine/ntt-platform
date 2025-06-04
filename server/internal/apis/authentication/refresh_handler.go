package authentication

import (
	"encoding/json"
	"fmt"
	"net/http"
	"nttplatform/internal/common"
)

func RefreshTokenHandler(ctx *common.Context, w http.ResponseWriter, r *http.Request,
	refreshTokenReq *RefreshTokenRequest) {
	authContext := ctx.GetSubContext("authentication").(*AuthenticationContext)

	userId, err := authContext.TokenizeService.ValidateRefreshToken(refreshTokenReq.RefreshToken)

	if err != nil {
		ctx.Logger.Error(fmt.Sprintf("Failed to validate refresh token: %s", err.Error()))
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Failed to validate refresh token"))
		return
	}

	user, err := authContext.Repository.GetUserById(userId)

	if err != nil {
		ctx.Logger.Error(fmt.Sprintf("Failed to get user: %s", err.Error()))
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Failed to get user"))
		return
	}

	newAccessToken, err := authContext.TokenizeService.Refresh(refreshTokenReq.RefreshToken, user)

	if err != nil {
		ctx.Logger.Error(fmt.Sprintf("Failed to refresh token: %s", err.Error()))
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Failed to refresh token"))
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(RefreshTokenResponse{
		AccessToken: newAccessToken,
	})
}
