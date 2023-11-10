package main

import (
	"app/controller"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/users", controller.GetAllUser)
	// e.POST("/users")
	e.GET("/users/:id", controller.GetOneUser)
	// e.PUT("/users/:id")
	// e.DELETE("/users/:id")
	e.Logger.Fatal(e.Start(":8080"))
}
