package main

import (
	"flag"
	"fmt"
	"net/http"
	"roadoxe-be/internal/router"
	"time"
)

type configurations struct {
	port int
	env  string
}

type AppStatus struct {
	Status      string `json:"status"`
	Enviourment string `json:"enviourment"`
	Version     string `json:"version"`
}

// type application struct {
// 	config config
// 	logger *log.Logger
// }

func main() {
	var cfg configurations

	flag.IntVar(&cfg.port, "port", 4000, "server port to listen on")
	flag.StringVar(&cfg.env, "env", "development", "Application enviourment (development|production)")
	flag.Parse()

	// app := &application{
	// 	config: cfg,
	// 	logger: logger,
	// }

	srv := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.port),
		Handler:      router.GetRoutes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	appConfig.Logger.Info("Starting server at port ", cfg.port)

	err := srv.ListenAndServe()
	if err != nil {
		appConfig.Logger.Error(err)
	}

}
