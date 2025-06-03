package common

import "net/http"

type HandlerFunc func(*Context, http.ResponseWriter, *http.Request)
type HandlerFuncT[T any] func(*Context, http.ResponseWriter, *http.Request, *T)
