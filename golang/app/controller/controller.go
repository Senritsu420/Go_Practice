package controller

import (
	"app/user"
	"net/http"
	"strconv"

	"github.com/labstack/echo"
)

// レスポンスJsonの定義
type RequestJson struct {
	Id   int    `json:"int"`
	Name string `json:"name"`
	Age  int    `json:"age"`
}

type ResponseAll struct {
	Status string      `json:"status"`
	Data   []user.User `json:"data"`
}

type ResponseOne struct {
	Status string    `json:"status"`
	Data   user.User `json:"data"`
}

func GetAllUser(c echo.Context) error {
	users := user.ReadAll(user.Db)
	return c.JSON(http.StatusOK, ResponseAll{
		Status: "OK",
		Data:   users,
	})
}

func GetOneUser(c echo.Context) error {
	param := c.Param("id")
	id, _ := strconv.Atoi(param)
	user := user.ReadOne(user.Db, id)
	return c.JSON(http.StatusOK, ResponseOne{
		Status: "OK",
		Data:   user,
	})
}
