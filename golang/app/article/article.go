package article

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/go-sql-driver/mysql"
)

type Article struct {
	Id    int    `json:"id"`
	Title string `json:"title"`
	Body  string `json:"body"`
}

var Db *sql.DB

// 初めに呼び出される関数でDBを起動する
func init() {
	Db = connectDB()
}

// DBを起動させる
func open(path string, count uint) *sql.DB {
	db, err := sql.Open("mysql", path)
	if err != nil {
		log.Fatal("open error: ", err)
	}

	// Pingを叩いて応答が無い場合は再帰的に起動を繰り返す
	if err = db.Ping(); err != nil {
		time.Sleep(time.Second * 2)
		count--
		fmt.Printf("retry... count:%v\n", count)
		return open(path, count)
	}

	fmt.Println("db connected!!")
	return db
}

// 直接ソースコードにDBのパスを記述せずに環境変数を使う
func connectDB() *sql.DB {
	jst, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		log.Fatal("time location error: ", err)
	}
	c := mysql.Config{
		DBName:    os.Getenv("MYSQL_DATABASE"),
		User:      os.Getenv("MYSQL_USER"),
		Passwd:    os.Getenv("MYSQL_PASSWORD"),
		Addr:      "db:3306",
		Net:       "tcp",
		ParseTime: true,
		Collation: "utf8mb4_unicode_ci",
		Loc:       jst,
	}
	return open(c.FormatDSN(), 100)
}

// Articleテーブルのレコードを全件取得
func ReadAll(db *sql.DB) []Article {
	var articles []Article
	rows, err := db.Query("SELECT * FROM article;")
	defer rows.Close()
	if err != nil {
		panic(err)
	}
	for rows.Next() {
		article := Article{}
		err = rows.Scan(&article.Id, &article.Title, &article.Body)
		if err != nil {
			panic(err)
		}
		articles = append(articles, article)
	}

	return articles
}

// Articleテーブルの特定のレコードを取得
func ReadOne(db *sql.DB, id int) Article {
	row := db.QueryRow("SELECT * FROM article WHERE id = ?", id)
	article := Article{}
	err := row.Scan(&article.Id, &article.Title, &article.Body)
	if err != nil {
		if err == sql.ErrNoRows {
			log.Fatal("No row")
		} else {
			log.Fatal(err)
		}
	}
	return article
}

// Articleテーブルに新しいレコードを挿入
func CreateArticle(db *sql.DB, title string, body string) error {
	if _, err := db.Exec("INSERT INTO article (title, body) VALUES (?, ?) ;", title, body); err != nil {
		log.Fatal(err)
	}
	return nil
}

// Articleテーブルの特定のレコードを更新
func UpdateArticle(db *sql.DB, title string, body string, id int) error {
	if _, err := db.Exec("UPDATE article SET title = ?, body = ? WHERE id = ?;", title, body, id); err != nil {
		log.Fatal(err)
	}
	return nil
}

// Articleテーブルの特定のレコードを削除
func DeleteArticle(db *sql.DB, id int) error {
	_, err := db.Exec("DELETE FROM article WHERE id = ?", id)
	if err != nil {
		log.Fatal(err)
	}
	return nil
}

func NewTable(db *sql.DB) error {
	cmd := `CREATE TABLE IF NOT EXISTS person(
		name varchar(10),
		age int
	)`
	_, err := db.Exec(cmd)
	if err != nil {
		log.Fatalln(err)
	}
	return nil
}
