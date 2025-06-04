package middlewares

import (
	"nttplatform/internal/common"
)

type MiddlewareFunc func(common.HandlerFunc) common.HandlerFunc
