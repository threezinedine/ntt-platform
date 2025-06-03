package authentication

import (
	"encoding/json"
	"fmt"
	"net/http"
	"nttplatform/internal/common"
)

func LoginHandler(ctx *common.Context, w http.ResponseWriter, r *http.Request, loginReq *LoginRequest) {
	authContext := ctx.GetSubContext("authentication").(*AuthenticationContext)

	user, err := authContext.Repository.GetUserByUsername(loginReq.Username)

	if err != nil {
		ctx.Logger.Error(fmt.Sprintf("User does not exist: %s", err.Error()))
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("User does not exist"))
		return
	}

	if user.Password != loginReq.Password {
		ctx.Logger.Error("Invalid password")
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Invalid password"))
		return
	}

	accessToken, refreshToken, err := authContext.TokenizeService.GenerateToken(user)

	if err != nil {
		ctx.Logger.Error(fmt.Sprintf("Failed to generate token: %s", err.Error()))
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Failed to generate token"))
		return
	}

	response := LoginResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
