package middlewares

import (
	"encoding/json"
	"net/http"
	common "nttplatform/internal/common"
)

func RequestBodyValidator[T any](handler common.HandlerFuncT[T]) common.HandlerFunc {
	// parse the request body to the type T
	return func(ctx *common.Context, w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("Content-Type") != "application/json" {
			ctx.Logger.Error("Content-Type is not application/json")
			w.WriteHeader(http.StatusUnsupportedMediaType)
			w.Write([]byte("Content-Type is not application/json"))
			return
		}

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
