package middlewares

import (
	"net/http"
	"nttplatform/internal/common"
)

func CorsMiddleware(handler common.HandlerFunc) common.HandlerFunc {
	return func(ctx *common.Context, w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		handler(ctx, w, r)
	}
}
