package main

import (
	"app/server"
	"app/user"
	"fmt"
	"log"
	"net/http"
)

func main() {
	// articles := article.ReadAll(article.Db)
	// fmt.Println(articles)

	// user.InsertUser(user.Db, "test", 21)
	// user.InsertUser(user.Db, "test2", 11)
	// one := user.ReadOne(user.Db, 1)
	// fmt.Println(one)
	// user.UpdateUser(user.Db, 2, "readone", 10)
	all := user.ReadAll(user.Db)
	fmt.Println(all)
	// user.DeleteUser(user.Db, 4)
	// all2 := user.ReadAll(user.Db)
	// fmt.Println(all2)

	// httpHandlerの準備
	mux := &http.ServeMux{}
	// httpHandlerの設定。第1引数に設定したURLへ接続すると第2引数のHandler処理が実行されるようになる
	mux.Handle("/", server.NewSampleHandler())
	// httpサーバー起動処理。引数にはポート番号とhttpHandlerを設定する
	log.Fatal(http.ListenAndServe(":8080", mux))
}
