package authentication_repository

import (
	"database/sql"
	"fmt"
	model "nttplatform/internal/apis"
	common "nttplatform/internal/common"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

type SqlRepository struct {
	db  *sql.DB
	ctx *common.Context
}

func NewSqlRepository(ctx *common.Context) *SqlRepository {
	db, err := sql.Open("mysql",
		fmt.Sprintf(
			"%s:%s@tcp(%s:%s)/%s",
			os.Getenv("DB_USER"),
			os.Getenv("DB_PASSWORD"),
			os.Getenv("DB_HOST"),
			os.Getenv("DB_PORT"),
			os.Getenv("DB_NAME")))

	if err != nil {
		ctx.Logger.Error("Failed to connect to database: %v", err.Error())
		os.Exit(1)
	} else {
		ctx.Logger.Debug("Connected to database")
	}

	return &SqlRepository{
		db:  db,
		ctx: ctx,
	}
}

func (r *SqlRepository) RegisterNewUser(user *model.User) error {
	_, err := r.db.Exec("INSERT INTO users (id, username, password, role) VALUES (?, ?, ?, ?)",
		user.Id, user.Username, user.Password, user.Role)

	if err != nil {
		r.ctx.Logger.Error(fmt.Sprintf("Sql command execution failed: %s", err.Error()))
		return err
	}

	r.ctx.Logger.Debug("New user registered successfully")

	return nil
}

func (r *SqlRepository) GetUserByUsername(username string) (*model.User, error) {
	row := r.db.QueryRow("SELECT * FROM users WHERE username = ?", username)

	var user model.User

	err := row.Scan(&user.Id, &user.Username, &user.Password, &user.Role)

	if err != nil {
		r.ctx.Logger.Error(fmt.Sprintf("Sql command execution failed: %s", err.Error()))
		return nil, err
	}

	return &user, nil
}

func (r *SqlRepository) GetUserById(id string) (*model.User, error) {
	row := r.db.QueryRow("SELECT * FROM users WHERE id = ?", id)

	var user model.User

	err := row.Scan(&user.Id, &user.Username, &user.Password, &user.Role)

	if err != nil {
		r.ctx.Logger.Error(fmt.Sprintf("Sql command execution failed: %s", err.Error()))
		return nil, err
	}

	return &user, nil
}

func (r *SqlRepository) Close() error {
	err := r.db.Close()

	if err != nil {
		r.ctx.Logger.Error("Failed to close database connection: %s", err.Error())
		return err
	}

	r.ctx.Logger.Debug("Closed database connection successfully")
	return nil
}
