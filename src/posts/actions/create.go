package postactions

import (
	"net/http"

	"github.com/fragmenta/auth/can"
	"github.com/fragmenta/mux"
	"github.com/fragmenta/server"
	"github.com/fragmenta/view"

	"github.com/fragmenta/fragmenta-cms/src/lib/session"
	"github.com/fragmenta/fragmenta-cms/src/posts"
	"github.com/fragmenta/fragmenta-cms/src/users"
)

// HandleCreateShow serves the create form via GET for posts.
func HandleCreateShow(w http.ResponseWriter, r *http.Request) error {

	post := posts.New()

	// Authorise
	user := session.CurrentUser(w, r)
	err := can.Create(post, user)
	if err != nil {
		return server.NotAuthorizedError(err)
	}

	// Fetch the users
	authors, err := users.FindAll(users.Where("role=?", users.Admin))
	if err != nil {
		return server.InternalError(err)
	}

	// Render the template
	view := view.NewRenderer(w, r)
	view.AddKey("currentUser", user)
	view.AddKey("post", post)
	view.AddKey("authors", authors)
	return view.Render()
}

// HandleCreate handles the POST of the create form for posts
func HandleCreate(w http.ResponseWriter, r *http.Request) error {

	post := posts.New()

	// Check the authenticity token
	err := session.CheckAuthenticity(w, r)
	if err != nil {
		return err
	}

	// Authorise
	user := session.CurrentUser(w, r)
	err = can.Create(post, user)
	if err != nil {
		return server.NotAuthorizedError(err)
	}

	// Setup context
	params, err := mux.Params(r)
	
	if err != nil {
		return server.InternalError(err)
	}

	// Validate the params, removing any we don't accept
	postParams := post.ValidateParams(params.Map(), posts.AllowedParams())

	id, err := post.Create(postParams)
	if err != nil {
		return server.InternalError(err)
	}

	// Redirect to the new post
	post, err = posts.Find(id)
	if err != nil {
		return server.InternalError(err)
	}

	return server.Redirect(w, r, post.IndexURL())
}
