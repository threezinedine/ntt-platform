package authentication

import (
	"errors"
	model "nttplatform/internal/apis"
)

type InMemoryRepository struct {
	users []*model.User
}

func NewInMemoryRepository() *InMemoryRepository {
	return &InMemoryRepository{
		users: []*model.User{},
	}
}

func (r *InMemoryRepository) RegisterNewUser(user *model.User) error {
	r.users = append(r.users, user)
	return nil
}

func (r *InMemoryRepository) GetUserByUsername(username string) (*model.User, error) {
	for _, user := range r.users {
		if user.Username == username {
			return user, nil
		}
	}
	return nil, errors.New("user not found")
}

func (r *InMemoryRepository) Close() error {
	return nil
}
