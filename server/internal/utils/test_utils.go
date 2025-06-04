package utils

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func CreateRequestT[T any](t *testing.T, method string, url string, data T) (*httptest.ResponseRecorder, *http.Request) {
	jsonData, err := json.Marshal(data)
	assert.NoError(t, err)

	request, err := http.NewRequest(method, url, bytes.NewBuffer(jsonData))
	assert.NoError(t, err)
	request.Header.Set("Content-Type", "application/json")

	return httptest.NewRecorder(), request
}

func CreateRequest(t *testing.T, method string, url string) (*httptest.ResponseRecorder, *http.Request) {
	request, err := http.NewRequest(method, url, nil)
	assert.NoError(t, err)

	return httptest.NewRecorder(), request
}

func GetResponse[T any](t *testing.T, response *httptest.ResponseRecorder) T {
	var result T
	err := json.Unmarshal(response.Body.Bytes(), &result)
	assert.NoError(t, err)
	return result
}
