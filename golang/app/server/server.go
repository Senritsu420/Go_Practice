package server

import (
	"app/article"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

type (
	SampleHandler struct {
		Article article.Article `json:"article"`
	}
	SampleResponse struct {
		Status     string          `json:"status"`
		Results    article.Article `json:"results"`
		ReturnCode string          `json:"returnCode"`
	}
)

// SampleHandlerの構造体にinterfaceのhttp.Handlerを設定して返す関数
// interfaceのhttp.HandlerにはServeHTTP関数が含まれており、後の処理ListenAndServe関数から呼び出される
func NewSampleHandler() http.Handler {
	data := article.ReadOne(article.Db, 2)
	fmt.Println(data)
	fmt.Printf("%T\n", data)
	return &SampleHandler{data}
}

// http.Handlerのinterfaceで定義されているServeHTTP関数を作成する。
// ServeHTTP関数はListenAndServe関数内で呼び出される
func (h *SampleHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// リターンコードの設定
	returnCode := 200

	// httpResponseの内容を設定
	res := &SampleResponse{
		Status:     "OK",
		Results:    h.Article,
		ReturnCode: strconv.Itoa(returnCode),
	}
	// レスポンスヘッダーの設定
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")

	// ステータスコードを設定
	w.WriteHeader(returnCode)

	// httpResponseの内容を書き込む
	buf, _ := json.MarshalIndent(res, "", "    ")
	_, _ = w.Write(buf)
}
