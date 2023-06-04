package main

// func (app *application) statusHandler(w http.ResponseWriter, r *http.Request) {
// 	currentStatus := AppStatus{
// 		Status:      "Available",
// 		Enviourment: app.config.env,
// 		Version:     version,
// 	}

// 	js, err := json.MarshalIndent(currentStatus, "", "\t")
// 	if err != nil {
// 		app.logger.Println(err)
// 	}

// 	app.logger.Println("Request recived")

// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusOK)
// 	w.Write(js)
// }
