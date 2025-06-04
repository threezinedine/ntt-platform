package authentication

import (
	"encoding/json"
	"net/http"
	"nttplatform/internal/common"
)

func GetUserInfoHandler(ctx *common.Context, w http.ResponseWriter, r *http.Request) {
	authContext := ctx.GetSubContext("authentication").(*AuthenticationContext)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(authContext.User.ToVisualUser())
}
