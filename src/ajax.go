package main

import (
	"feedparser"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path"
	"strconv"
)

//AjaxResponse response ajax
type AjaxResponse struct {
	Wr      http.ResponseWriter
	Rq      *http.Request
	dirhome string
}

//NewAjaxCreate create new ajax response
func NewAjaxCreate(w http.ResponseWriter, r *http.Request) {
	defer func() {
		e := recover()
		if e != nil {
			log.Println(e)
		}

		r.Body.Close()

	}()

	ajaxrPTR := &AjaxResponse{
		Wr: w,
		Rq: r,
	}

	ajaxrPTR.start()
}

func (i *AjaxResponse) getDirHome() (string, error) {
	if i.dirhome == "" {
		home, err := os.UserHomeDir()
		if err != nil {
			log.Println(err)
			return "", err
		}

		i.dirhome = path.Join(home, "feednotifnnttoo")
		os.MkdirAll(i.dirhome, os.ModePerm)
	}

	return i.dirhome, nil
}

func (i *AjaxResponse) write(str string) {
	i.Wr.Write([]byte(str))
}
func (i *AjaxResponse) formValue(name string) string {
	return i.Rq.FormValue(name)
}
func (i *AjaxResponse) start() {
	atype := i.formValue("atype")
	if atype == "checkurl" {
		url := i.formValue("arg")

		feedreaderC := &feedparser.FeedParser{}
		feedreaderC.LoadPage(url)

		title := feedreaderC.GetTitle()

		log.Println(title)
		i.write(title)

		return
	}

	if atype == "savelistrss" {
		var arg = i.formValue("arg")
		dirpath, err := i.getDirHome()
		response := ""
		if err != nil {
			response = "error:nill home directory"
		}
		fullpath := path.Join(dirpath, "listfeed.json")

		ioutil.WriteFile(fullpath, []byte(arg), os.ModePerm)
		i.write(response)
		return
	}

	if atype == "getlistrss" {
		dirpath, err := i.getDirHome()

		if err != nil {
			response := "error:nill home directory"
			i.write(response)
			return
		}

		b, _ := ioutil.ReadFile(path.Join(dirpath, "listfeed.json"))
		i.Wr.Write(b)
		return
	}

	if atype == "feedctn" {
		log.Println("check url")
		url := i.formValue("arg")
		max := i.formValue("max")
		maxint, _ := strconv.ParseInt(max, 10, 32)

		feedreaderC := &feedparser.FeedParser{}
		feedreaderC.LoadPage(url)
		ctn := feedreaderC.GetContents(int(maxint))
		i.write(ctn)
		return
	}

	if atype == "config" {
		data := i.formValue("data")
		dirpath, err := i.getDirHome()
		if err != nil {
			response := "error:nill home directory"
			i.write(response)
			return
		}

		filepath := path.Join(dirpath, "config.json")
		if data == "" {
			b, _ := ioutil.ReadFile(filepath)
			i.Wr.Write(b)

		} else {
			ioutil.WriteFile(filepath, []byte(data), os.ModePerm)
			i.write("sucess")
		}
		return
	}

	if atype == "savedurl" {
		data := i.formValue("data")
		dirpath, err := i.getDirHome()
		if err != nil {
			response := "error:nill home directory"
			i.write(response)
			return
		}

		filepath := path.Join(dirpath, "savedurl.json")
		if data == "" {
			b, _ := ioutil.ReadFile(filepath)
			i.Wr.Write(b)

		} else {
			ioutil.WriteFile(filepath, []byte(data), os.ModePerm)
			i.write("sucess")
		}
		return
	}
}
