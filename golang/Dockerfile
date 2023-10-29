FROM golang:1.19.2-alpine3.16

ENV GOPATH /go
ENV GO111MODULE on
RUN mkdir /go/src/app

RUN apk update && \
    apk --no-cache add git && \
    apk add bash

# RUN mkdir /go/src/app
WORKDIR /go/src/app

RUN go mod init app

RUN go mod tidy && \
    go install github.com/cosmtrek/air@v1.40.4

CMD ["air", "-c", ".air.toml"]
