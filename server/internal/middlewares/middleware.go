package middlewares

import (
	"fmt"
	"net/http"
	common "nttplatform/internal/common"
)

type WarpMux struct {
	Mux         *http.ServeMux
	middlewares []MiddlewareFunc
	Context     *common.Context
}

func (wm *WarpMux) Register(middleware MiddlewareFunc) {
	wm.middlewares = append(wm.middlewares, middleware)
}

func (wm *WarpMux) AddHandler(method string, path string, handler common.HandlerFunc) {
	var finalHandlerPath = fmt.Sprintf("%s %s", method, path)

	var i int = len(wm.middlewares) - 1
	var finalHandler common.HandlerFunc = handler
	for i >= 0 {
		finalHandler = wm.middlewares[i](finalHandler)
		i--
	}

	wm.Mux.HandleFunc(finalHandlerPath, func(w http.ResponseWriter, r *http.Request) {
		finalHandler(wm.Context, w, r)
	})
}
