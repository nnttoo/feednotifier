package main

import (
	"log"
	"net/http"
	"regexp"
)

func getTagFromURL(str string) string {
	//https://github.com/nnttoo/feednotifier/releases/tag/v0.0002
	re := regexp.MustCompile(`tag/(.*)`)
	matched := re.FindStringSubmatch(str)
	if len(matched) > 1 {
		return matched[1]
	}

	return ""
}

//CheckUpdate check new version from github release page
func CheckUpdate() {
	var link = "https://github.com/nnttoo/feednotifier/releases/latest"
	res, err := http.Get(link)

	defer func() {
		r := recover()
		if r != nil {
			log.Println(r)
		}
		res.Body.Close()
	}()
	if err != nil {
		log.Panic(err)
	}
	url := res.Request.URL.String()

	nversion := getTagFromURL(url)

	if nversion == Version {
		log.Println("noneed to update")
		return
	}

	res.Body.Close()
	OpenElectronUpdateDialog(url, Version, nversion)
}
