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
	users := []User{}
	result := db.Find(&users)
	if result.Error != nil {
		log.Fatal(result.Error)
	}
	return users
}

// レコード単体取得
func ReadOne(db *gorm.DB, id int) User {
	user := User{}
	result := db.First(&user, id)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		log.Fatal(result.Error)
	}
	return user
}

// レコード作成
func InsertUser(db *gorm.DB, name string, age int) {
	user := User{
		Name: name,
		Age:  age,
	}
	result := db.Create(&user)
	if result.Error != nil {
		log.Fatal(result.Error)
	}
	// 今回の結果の行数
	fmt.Println("count:", result.RowsAffected)
}

// レコード更新
func UpdateUser(db *gorm.DB, id int, name string, age int) {
	// 先に更新するユーザを取得する
	user := ReadOne(db, id)
	// 構造体にidがある場合はupdateされる
	user.Name = name
	user.Age = age
	result := db.Save(&user)
	if result.Error != nil {
		log.Fatal(result.Error)
	}
	fmt.Println("user:", user)
}

// レコード削除
func DeleteUser(db *gorm.DB, id int) {
	// DeletedAtがある場合は論理削除になる
	db.Where("id = ?", id).Delete(&User{})
	// 物理削除の場合は以下のようになる
	// db.Unscoped().Where("id = ?", id).Delete(&User{})
}
