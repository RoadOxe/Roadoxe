package router

import (
	"github.com/julienschmidt/httprouter"
)

func GetRoutes() *httprouter.Router {
	router := httprouter.New()

	registerAuthRoutes(router)

	return router
}
