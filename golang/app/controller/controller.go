package controller

import (
	"app/user"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetAllUser(c *gin.Context) {
	users := user.ReadAll(user.Db)
	c.JSONP(http.StatusOK, gin.H{
		"status": "OK",
		"data":   users,
	})
}

func GetOneUser(c *gin.Context) {
	param := c.Param("id")
	id, _ := strconv.Atoi(param)
	user := user.ReadOne(user.Db, id)
	c.JSONP(http.StatusOK, gin.H{
		"status": "OK",
		"data":   user,
	})
}

// func InsertUser(c *gin.Context) {
// 	name := c.DefaultQuery()
// }
