package main

import (
	"errors"
	"net/http"
	"nttplatform/internal/common"
	"nttplatform/internal/middlewares"
	"os"
)

func main() {
	var server *http.ServeMux = http.NewServeMux()
	var logger *common.LogrusLogger = common.NewLogrusLogger()

	var warpMux middlewares.WarpMux = middlewares.WarpMux{
		Mux: server,
		Context: common.Context{
			Logger: logger,
		},
	}

	warpMux.Register(middlewares.RequestLogging)

	logger.Info("Starting the server on port 8080")

	var err error = http.ListenAndServe(":8080", warpMux.Mux)

	if errors.Is(err, http.ErrServerClosed) {
		logger.Info("Server closed")
	} else if err != nil {
		logger.Error("Failed to start the server: ", err.Error())
		os.Exit(1)
	}
}
