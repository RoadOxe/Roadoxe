package main

import (
	"roadoxe-be/internal/config"
	"roadoxe-be/internal/logger"
)

var appConfig config.AppConfig

func init() {
	var appLogger = logger.Logger{}

	// In future this will come from the .evn or env.yaml file.
	appConfig = config.AppConfig{
		Env:     "development",
		Status:  "Availabe",
		Version: "1.0.0",
		Logger:  &appLogger,
	}
}
