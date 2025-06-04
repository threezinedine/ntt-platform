package authentication

import (
	"fmt"
	"net/http"
	model "nttplatform/internal/apis"
	"nttplatform/internal/common"
)

func RegisterHandler(ctx *common.Context, w http.ResponseWriter, r *http.Request, registerReq *RegisterRequest) {
	authContext := ctx.GetSubContext("authentication").(*AuthenticationContext)

	hashedPassword, err := authContext.PasswordService.HashPassword(registerReq.Password)

	if err != nil {
		ctx.Logger.Error(fmt.Sprintf("Failed to hash password: %s", err.Error()))
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Failed to hash password"))
		return
	}

	user := model.CreateNewUser(ctx.IdService.GenerateId(), registerReq.Username, hashedPassword)

	err = authContext.Repository.RegisterNewUser(user)

	if err != nil {
		ctx.Logger.Error(fmt.Sprintf("Failed to register new user: %s", err.Error()))
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Failed to register new user"))
		return
	}

	ctx.Logger.Info(fmt.Sprintf("Registering user: %s %s", registerReq.Username, registerReq.Password))
	w.WriteHeader(http.StatusCreated)
}
