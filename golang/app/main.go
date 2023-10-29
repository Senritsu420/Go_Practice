package main

import (
	"app/controller"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/get_all", controller.GetAllUser)
	r.GET("/get_one/:id", controller.GetOneUser)
	r.Run()
}
