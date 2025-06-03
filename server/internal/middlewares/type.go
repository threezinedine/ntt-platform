package middlewares

import (
	"net/http"
	"nttplatform/internal/common"
)

type MiddlewareFunc func(*common.Context, common.HandlerFunc, http.ResponseWriter, *http.Request) common.HandlerFunc
