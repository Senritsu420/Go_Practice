package controller

import (
	"app/user"
	"net/http"
	"strconv"

	"github.com/labstack/echo"
)

// 全てのuser情報を取得し、JSON形式で返す
func GetAllUser(c echo.Context) error {
	// 全てのuser情報を取得
	users := user.ReadAll(user.Db)
	// 全てのuser情報をJSON形式で返す
	return c.JSON(http.StatusOK, users)
}

// 特定のuser情報を取得し、JSON形式で返す
func GetOneUser(c echo.Context) error {
	// パスパラメータ「id」を取得
	param := c.Param("id")
	// idを整数型に変換
	id, _ := strconv.Atoi(param)
	// 特定のuser情報を取得
	user := user.ReadOne(user.Db, id)
	// 特定のuser情報をJSON形式で返す
	return c.JSON(http.StatusOK, user)
}

// 送られてきた情報を元に新規userを作成し、JSON形式で返す
func PostNewUser(c echo.Context) error {
	// user構造体作成
	u := new(user.User)
	// 送られてきた情報を元に構造体へのデータ格納を行う
	err := c.Bind(u)
	// エラー発生時はエラーを返す
	if err != nil {
		return err
	}
	// 構造体の情報を元に新規userを作成
	user.InsertUser(user.Db, u.Name, u.Age)
	// 新規user情報をJSON形式で返す
	return c.JSON(http.StatusOK, u)
}

// 送られてきた情報を元にuser情報を更新し、JSON形式で返す
func PutUser(c echo.Context) error {
	// パスパラメータ「id」を取得
	param := c.Param("id")
	// idを整数型に変換
	id, _ := strconv.Atoi(param)
	// user構造体作成
	u := new(user.User)
	// 送られてきた情報を元に構造体へのデータ格納を行う
	err := c.Bind(u)
	// エラー発生時はエラーを返す
	if err != nil {
		return err
	}
	// 構造体の情報を元にuserを更新
	user.UpdateUser(user.Db, id, u.Name, u.Age)
	// 更新したuser情報をJSON形式で返す
	return c.JSON(http.StatusOK, u)
}

// 送られてきた情報を元にuserを削除し、JSON形式で返す
func DeleteUser(c echo.Context) error {
	// パスパラメータ「id」を取得
	param := c.Param("id")
	// idを整数型に変換
	id, _ := strconv.Atoi(param)
	// 構造体の情報を元にuserを更新
	user := user.DeleteUser(user.Db, id)
	// 更新したuser情報をJSON形式で返す
	return c.JSON(http.StatusOK, user)
}
