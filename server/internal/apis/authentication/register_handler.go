package authentication

import (
	"fmt"
	"net/http"
	model "nttplatform/internal/apis"
	"nttplatform/internal/common"
)

func RegisterHandler(ctx *common.Context, w http.ResponseWriter, r *http.Request, registerReq *RegisterRequest) {
	authContext := ctx.GetSubContext("authentication").(*AuthenticationContext)

	user := &model.User{
		Id:       ctx.IdService.GenerateId(),
		Username: registerReq.Username,
		Password: registerReq.Password,
	}

	err := authContext.Repository.RegisterNewUser(user)

	if err != nil {
		ctx.Logger.Error(fmt.Sprintf("Failed to register new user: %s", err.Error()))
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Failed to register new user"))
		return
	}

	ctx.Logger.Info(fmt.Sprintf("Registering user: %s %s", registerReq.Username, registerReq.Password))
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("User registered successfully"))
}
