package model

const (
	ROLE_ADMIN = "admin"
	ROLE_USER  = "user"
	ROLE_GUEST = "guest"
)

type User struct {
	Id       string `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
	Role     string `json:"role"`
}
