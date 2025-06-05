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

func emptyHandler(_ *common.Context, w http.ResponseWriter, _ *http.Request) {
	w.WriteHeader(http.StatusNoContent)
}

func (wm *WarpMux) AddHandler(method string, path string, handler common.HandlerFunc) {
	var finalHandlerPath = fmt.Sprintf("%s %s", method, path)
	var prelightHandlerPath = fmt.Sprintf("%s %s", http.MethodOptions, path)

	var i int = len(wm.middlewares) - 1
	var finalHandler common.HandlerFunc = handler
	var prelightHandler common.HandlerFunc = emptyHandler
	for i >= 0 {
		finalHandler = wm.middlewares[i](finalHandler)
		prelightHandler = wm.middlewares[i](prelightHandler)
		i--
	}

	wm.Mux.HandleFunc(finalHandlerPath, func(w http.ResponseWriter, r *http.Request) {
		finalHandler(wm.Context, w, r)
	})

	wm.Mux.HandleFunc(prelightHandlerPath, func(w http.ResponseWriter, r *http.Request) {
		prelightHandler(wm.Context, w, r)
	})
}
