package middlewares

import (
	"fmt"
	"net/http"
	common "nttplatform/internal/common"
	"time"
)

func RequestLogging(handler common.HandlerFunc) common.HandlerFunc {
	return func(ctx *common.Context, w http.ResponseWriter, r *http.Request) {
		ctx.Logger.Info(fmt.Sprintf("Request: %s %s", r.Method, r.URL.Path))
		start := time.Now()
		handler(ctx, w, r)
		duration := time.Since(start)
		ctx.Logger.Info(fmt.Sprintf("Request: %s %s returned %d ms", r.Method, r.URL.Path, duration.Milliseconds()))
	}
}
