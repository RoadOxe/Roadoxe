package config

import "log"

type AppConfig struct {
	Env      string
	InfoLog  *log.Logger
	ErrorLog *log.Logger
}
