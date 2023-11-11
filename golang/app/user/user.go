package user

import (
	"errors"
	"fmt"
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type User struct {
	// gorm.Modelをつけると、idとCreatedAtとUpdatedAtとDeletedAtが作られる
	gorm.Model

	Name string
	Age  int
}

var Db *gorm.DB

func init() {
	Db = dbInit()
	// Userテーブル作成
	Db.AutoMigrate(&User{})
}

// DBを起動させる
func dbInit() *gorm.DB {
	dsn := fmt.Sprintf(`%s:%s@tcp(db:3306)/%s?charset=utf8mb4&parseTime=True`, os.Getenv("MYSQL_USER"), os.Getenv("MYSQL_PASSWORD"), os.Getenv("MYSQL_DATABASE"))
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}
	return db
}

// レコード全件取得
func ReadAll(db *gorm.DB) []User {
	// user構造体のスライスを作成
	users := []User{}
	// 全てのuser情報を取得
	result := db.Find(&users)
	// エラー発生時はエラー内容を表示
	if result.Error != nil {
		log.Fatal(result.Error)
	}
	// 全てのuser情報を返す
	return users
}

// レコード単体取得
func ReadOne(db *gorm.DB, id int) User {
	// user構造体を作成
	user := User{}
	// 特定のidのuser情報を取得
	result := db.First(&user, id)
	// idが見つからない場合はエラー内容を表示
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		log.Fatal(result.Error)
	}
	// 特定のuser情報を返す
	return user
}

// レコード作成
func InsertUser(db *gorm.DB, name string, age int) error {
	// 引数を元に追加するuser構造体を作成
	user := User{
		Name: name,
		Age:  age,
	}
	// 新規userを作成する
	result := db.Create(&user)
	// エラー発生時はエラー内容を表示
	if result.Error != nil {
		log.Fatal(result.Error)
	}

	return nil
}

// レコード更新
func UpdateUser(db *gorm.DB, id int, name string, age int) error {
	// 更新するユーザを取得する
	user := ReadOne(db, id)
	// 構造体にidがある場合はupdateされる
	user.Name = name
	user.Age = age
	result := db.Save(&user)
	// エラー発生時はエラー内容を表示
	if result.Error != nil {
		log.Fatal(result.Error)
	}

	return nil
}

// レコード削除
func DeleteUser(db *gorm.DB, id int) User {
	// 削除するuser情報を取得
	user := ReadOne(db, id)
	// DeletedAtがある場合は論理削除になる
	db.Where("id = ?", id).Delete(&User{})
	// 物理削除の場合は以下のようになる
	// db.Unscoped().Where("id = ?", id).Delete(&User{})

	// 削除したuser情報を返す
	return user
}
