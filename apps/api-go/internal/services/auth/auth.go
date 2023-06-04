package auth

import "roadoxe-be/internal/logger"

type AuthService struct {
	loggerService *logger.Logger
}

func (a *AuthService) Register() {
	a.loggerService.Debug("Need to add implementation here")
}
