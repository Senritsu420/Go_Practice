package main

import (
	"app/controller"
	"net/http"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	// echoインスタンスを生成
	e := echo.New()
	// httpリクエストの情報をログに表示
	e.Use(middleware.Logger())
	// パニックを回復し、スタックトレースを表示
	e.Use(middleware.Recover())

	/* CORS(オリジン間リソース共有)の設定 */
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		/* http://localhost:3000からの接続を許可する */
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{
			http.MethodGet,
			http.MethodPut,
			http.MethodPost,
			http.MethodDelete,
		},
	}))

	// ルーティング
	e.GET("/users", controller.GetAllUser)
	e.POST("/users", controller.PostNewUser)
	e.GET("/users/:id", controller.GetOneUser)
	e.PUT("/users/:id", controller.PutUser)
	e.DELETE("/users/:id", controller.DeleteUser)

	// サーバーをスタートさせる
	// ポート番号は引数で指定できる
	e.Logger.Fatal(e.Start(":8080"))
}
