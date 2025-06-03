package middlewares

import (
	"fmt"
	"net/http"
	common "nttplatform/internal/common"
	"time"
)

func RequestLogging(ctx *common.Context, handler common.HandlerFunc, w http.ResponseWriter, r *http.Request) common.HandlerFunc {
	return func(ctx *common.Context, w http.ResponseWriter, r *http.Request) {
		ctx.Logger.Info(fmt.Sprintf("Request: %s %s", r.Method, r.URL.Path))
		start := time.Now()
		handler(ctx, w, r)
		duration := time.Since(start)
		ctx.Logger.Info(fmt.Sprintf("Request: %s %s returned %d us", r.Method, r.URL.Path, duration.Microseconds()))
	}
}
