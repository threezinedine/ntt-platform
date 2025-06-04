package password

import (
	"golang.org/x/crypto/bcrypt"
)

type PasswordService interface {
	HashPassword(password string) (string, error)
	CheckPassword(hashedPassword string, password string) bool
}

type NoHashPasswordService struct {
}

func NewNoHashPasswordService() *NoHashPasswordService {
	return &NoHashPasswordService{}
}

func (s *NoHashPasswordService) HashPassword(password string) (string, error) {
	return password, nil
}

func (s *NoHashPasswordService) CheckPassword(hashedPassword string, password string) bool {
	return hashedPassword == password
}

type BcryptPasswordService struct {
}

func NewBcryptPasswordService() *BcryptPasswordService {
	return &BcryptPasswordService{}
}

func (s *BcryptPasswordService) HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(hashedPassword), nil
}

func (s *BcryptPasswordService) CheckPassword(hashedPassword string, password string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password)) == nil
}
