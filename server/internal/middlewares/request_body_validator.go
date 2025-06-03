package middlewares

import (
	"encoding/json"
	"net/http"
	common "nttplatform/internal/common"
)

func RequestBodyValidator[T any](handler common.HandlerFuncT[T]) common.HandlerFunc {
	// parse the request body to the type T
	return func(ctx *common.Context, w http.ResponseWriter, r *http.Request) {
		var body T
		err := json.NewDecoder(r.Body).Decode(&body)
		if err != nil {
			ctx.Logger.Error("Failed to parse request body: ", err.Error())
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(err.Error()))
			return
		}

		handler(ctx, w, r, &body)
	}
}
