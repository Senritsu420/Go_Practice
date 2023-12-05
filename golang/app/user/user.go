package user

import (
	"errors"
	"fmt"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type User struct {
	ID        uint       `gorm:"primary_key" json:"id"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `json:"deleted_at"`
	Name      string     `json:"name"`
	Age       int        `json:"age"`
}

var Db *gorm.DB

func init() {
	dbInit()
	// Userテーブル作成
	Db.AutoMigrate(&User{})
}

// DBに接続するまで再試行し、接続出来たらDBを返す
func dbInit() {
	user := os.Getenv("MYSQL_USER")
	pw := os.Getenv("MYSQL_PASSWORD")
	db_name := os.Getenv("MYSQL_DATABASE")
	dsn := fmt.Sprintf(`%s:%s@tcp(db:3306)/%s?charset=utf8mb4&parseTime=True`, user, pw, db_name)
	dialector := mysql.Open(dsn)
	var err error
	// DBコンテナが立ち上がるまで再試行
	// GoがDBコンテナが立ち上がる前に接続しに行くとエラーになるため
	if Db, err = gorm.Open(dialector, &gorm.Config{}); err != nil {
		connectDB(dialector, 100)
	}
	fmt.Println("db connected!!")
}

// DBに接続を行う
func connectDB(dialector gorm.Dialector, count uint) {
	var err error
	Db, err = gorm.Open(dialector, &gorm.Config{})
	if err != nil {
		if count > 1 {
			time.Sleep(time.Second * 2)
			count--
			fmt.Printf("retry... count:%v\n", count)
			connectDB(dialector, count)
			return
		}
		panic(err.Error())
	}
}

// レコード全件取得
func ReadAll(db *gorm.DB) ([]User, error) {
	// user構造体のスライスを作成
	users := []User{}
	// 全てのuser情報を取得
	result := db.Find(&users)
	// エラー発生時はエラー内容を表示
	if result.Error != nil {
		return users, result.Error
	}
	// 全てのuser情報を返す
	return users, result.Error
}

// レコード単体取得
func ReadOne(db *gorm.DB, id int) (User, error) {
	// user構造体を作成
	user := User{}
	// 特定のidのuser情報を取得
	result := db.First(&user, id)
	// idが見つからない場合はエラー内容を表示
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return user, result.Error
	}
	// 特定のuser情報を返す
	return user, result.Error
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
		return result.Error
	}

	return nil
}

// レコード更新
func UpdateUser(db *gorm.DB, id int, name string, age int) error {
	// 更新するユーザを取得する
	user, err := ReadOne(db, id)
	if err != nil {
		return err
	}
	// 構造体にidがある場合はupdateされる
	user.Name = name
	user.Age = age
	result := db.Save(&user)
	// エラー発生時はエラー内容を表示
	if result.Error != nil {
		return result.Error
	}

	return nil
}

// レコード削除
func DeleteUser(db *gorm.DB, id int) (User, error) {
	// 削除するuser情報を取得
	user, err := ReadOne(db, id)
	if err != nil {
		return user, err
	}
	// DeletedAtがある場合は論理削除になる
	db.Where("id = ?", id).Delete(&User{})
	// 物理削除の場合は以下のようになる
	// db.Unscoped().Where("id = ?", id).Delete(&User{})

	// 削除したuser情報を返す
	return user, err
}
