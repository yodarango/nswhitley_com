package imageactions

import (
	"encoding/json"
	"net/http"
	"os"

	"github.com/fragmenta/auth/can"
	"github.com/fragmenta/fragmenta-cms/src/images"
	"github.com/fragmenta/fragmenta-cms/src/lib/session"
	"github.com/fragmenta/server"
)
type ImageCustom struct {
	Name string
	Path string
}
// Fragmenta non e chaiara su a cosa sirvono queste actions, quindi ho createo la mia propria
// this gets all images from the uploads directory
func HandleIndexApi(w http.ResponseWriter, r *http.Request) error {

	// Authorise list image
	user := session.CurrentUser(w, r)
	err := can.List(images.New(), user)
	if err != nil {
		return server.NotAuthorizedError(err)
	}

	imgsInDir, err := os.ReadDir("public/uploads")	
	if err != nil {
		return server.InternalError(err)
	}

	files := make([]ImageCustom, 0)

	for _, img := range imgsInDir {
		var imgCustom ImageCustom

		imgCustom.Name = img.Name()
		imgCustom.Path = img.Name()

		files = append(files, imgCustom)
	}

	err = json.NewEncoder(w).Encode(files) 

	if err != nil {
			return server.InternalError(err)
	}

	return nil
}

