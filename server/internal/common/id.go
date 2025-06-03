package common

import "github.com/google/uuid"

type IdService interface {
	GenerateId() string
}

type UUIDService struct {
}

func (s *UUIDService) GenerateId() string {
	return uuid.New().String()
}
