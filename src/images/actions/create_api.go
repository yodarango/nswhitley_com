package imageactions

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"

	"github.com/fragmenta/auth/can"
	"github.com/fragmenta/fragmenta-cms/src/images"
	"github.com/fragmenta/fragmenta-cms/src/lib/session"
	"github.com/fragmenta/server"
)

// Handler per caricare nuove immagini
func HandleCreateApi(w http.ResponseWriter, r *http.Request) error {

	user := session.CurrentUser(w, r)
	err := can.List(images.New(), user)
	if err != nil {
		return server.NotAuthorizedError(err)
	}
	
	err = r.ParseMultipartForm(10 << 20) 
	if err != nil {
		return fmt.Errorf("Error decoding image")
	}

	file, header, err := r.FormFile("image")
	if err != nil {
		return fmt.Errorf("Error uploading image")
	}
	defer file.Close()

	// Limita la dimensione massima a 2MB
	if header.Size > 2*1024*1024 {
		return fmt.Errorf( "Max size is 2MB")
	}

	// Salva l'immagine nella cartella uploads
	savePath := filepath.Join("public/uploads", header.Filename)

	outFile, err := os.Create(savePath)
	if err != nil {
		return fmt.Errorf( "Could not write to that folder sorry")
	}
	defer outFile.Close()

	_, err = io.Copy(outFile, file)
	if err != nil {
		return fmt.Errorf( "I had an issue uploading, sorry")
	}

	newImage := ImageCustom{Name: header.Filename, Path: header.Filename}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"Success": true,
		"Name":    newImage.Name,
		"Path":    newImage.Path,
	})

	return nil
}
