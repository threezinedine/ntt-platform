package middlewares

import (
	"net/http"
	"nttplatform/internal/common"
)

func OutputJsonMiddleware(handler common.HandlerFunc) common.HandlerFunc {
	return func(ctx *common.Context, w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		handler(ctx, w, r)
	}
}
