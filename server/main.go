package main

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"nttplatform/internal/apis/authentication"
	"nttplatform/internal/common"
	"nttplatform/internal/middlewares"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	var server *http.ServeMux = http.NewServeMux()
	var logger *common.LogrusLogger = common.NewLogrusLogger()

	var warpMux middlewares.WarpMux = middlewares.WarpMux{
		Mux: server,
		Context: &common.Context{
			Logger:      logger,
			IdService:   &common.UUIDService{},
			SubContexts: make(map[string]common.SubContext),
		},
	}

	warpMux.Context.AddSubContext("authentication", authentication.NewAuthenticationContext(warpMux.Context))

	warpMux.Register(middlewares.RequestLogging)
	warpMux.Register(middlewares.CorsMiddleware)
	warpMux.Register(middlewares.OutputJsonMiddleware)

	warpMux.AddHandler(http.MethodPost, "/register", middlewares.RequestBodyValidator(authentication.RegisterHandler))
	warpMux.AddHandler(http.MethodPost, "/login", middlewares.RequestBodyValidator(authentication.LoginHandler))
	warpMux.AddHandler(http.MethodGet, "/user",
		authentication.AuthenticationMiddleware(authentication.GetUserInfoHandler))
	warpMux.AddHandler(http.MethodPost, "/refresh",
		middlewares.RequestBodyValidator(authentication.RefreshTokenHandler))

	logger.Info(fmt.Sprintf("Starting the server on port %s", os.Getenv("PORT")))

	err = http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), warpMux.Mux)

	if errors.Is(err, http.ErrServerClosed) {
		logger.Info("Server closed")
	} else if err != nil {
		logger.Error("Failed to start the server: ", err.Error())
		os.Exit(1)
	}
}
