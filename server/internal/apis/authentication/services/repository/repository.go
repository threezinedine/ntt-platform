package authentication_repository

import model "nttplatform/internal/apis"

type Repository interface {
	RegisterNewUser(user *model.User) error
	GetUserByUsername(username string) (*model.User, error)
	GetUserById(id string) (*model.User, error)
	Close() error
}
