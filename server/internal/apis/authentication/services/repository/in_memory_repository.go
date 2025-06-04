package authentication_repository

import (
	"errors"
	model "nttplatform/internal/apis"
)

type InMemoryRepository struct {
	Users []*model.User
}

func NewInMemoryRepository() *InMemoryRepository {
	return &InMemoryRepository{
		Users: []*model.User{},
	}
}

func (r *InMemoryRepository) RegisterNewUser(user *model.User) error {
	r.Users = append(r.Users, user)
	return nil
}

func (r *InMemoryRepository) GetUserByUsername(username string) (*model.User, error) {
	for _, user := range r.Users {
		if user.Username == username {
			return user, nil
		}
	}
	return nil, errors.New("user not found")
}

func (r *InMemoryRepository) GetUserById(id string) (*model.User, error) {
	for _, user := range r.Users {
		if user.Id == id {
			return user, nil
		}
	}
	return nil, errors.New("user not found")
}

func (r *InMemoryRepository) Close() error {
	return nil
}
