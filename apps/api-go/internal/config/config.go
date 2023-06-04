package config

import (
	"roadoxe-be/internal/logger"
)

type AppConfig struct {
	Env     string
	Status  string
	Version string
	Logger  *logger.Logger
}
