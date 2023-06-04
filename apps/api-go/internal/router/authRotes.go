package router

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func registerAuthRoutes(router *httprouter.Router) {
	router.HandlerFunc(http.MethodGet, "/status", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("hello"))
	})
}
