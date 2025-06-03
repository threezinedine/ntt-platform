package authentication

type LoginResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

type RegisterResponse struct {
	Id       string `json:"id"`
	Username string `json:"username"`
}
