package password

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBcryptPasswordService(t *testing.T) {
	bcryptPasswordService := NewBcryptPasswordService()

	hashedPassword, err := bcryptPasswordService.HashPassword("password")
	if err != nil {
		t.Errorf("Failed to hash password: %s", err.Error())
	}

	valid := bcryptPasswordService.CheckPassword(hashedPassword, "password")

	if !valid {
		t.Errorf("Failed to check password: %s", err.Error())
	}
}

func TestBcryptPasswordService_CheckPassword_Invalid(t *testing.T) {
	bcryptPasswordService := NewBcryptPasswordService()

	valid := bcryptPasswordService.CheckPassword("password", "password")

	assert.False(t, valid)
}
