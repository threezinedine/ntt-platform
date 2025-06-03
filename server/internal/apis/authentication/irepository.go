package authentication

import model "nttplatform/internal/apis"

type IRepository interface {
	RegisterNewUser(user *model.User) error
	GetUserByUsername(username string) (*model.User, error)
	Close() error
}
