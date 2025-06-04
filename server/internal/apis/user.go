package model

const (
	ROLE_ADMIN = "admin"
	ROLE_USER  = "user"
	ROLE_GUEST = "guest"
)

type VisualUser struct {
	Id       string `json:"id"`
	Username string `json:"username"`
}

type User struct {
	Id       string `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

func CreateNewUser(id string, username string, password string) *User {
	return &User{
		Id:       id,
		Username: username,
		Password: password,
		Role:     ROLE_USER,
	}
}

func (u *User) ToVisualUser() *VisualUser {
	return &VisualUser{
		Id:       u.Id,
		Username: u.Username,
	}
}
