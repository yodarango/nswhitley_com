package imageactions

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"github.com/fragmenta/auth/can"
	"github.com/fragmenta/fragmenta-cms/src/images"
	"github.com/fragmenta/fragmenta-cms/src/lib/session"
	"github.com/fragmenta/server"
)


func HandleDeleteApi(w http.ResponseWriter, r *http.Request) error {
	// Authorise list image
	user := session.CurrentUser(w, r)
	err := can.List(images.New(), user)
	if err != nil {
		return server.NotAuthorizedError(err)
	}
	
	path := r.FormValue("path")
	if path == "" {
		return server.InternalError(fmt.Errorf("Percorso immagine mancante"))
	}

	fullPath := filepath.Join("public/uploads", path)
	err = os.Remove(fullPath)
	if err != nil {
		return server.InternalError(err)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]bool{
		"Success": true,
	})

	return nil
}