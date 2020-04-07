package main

import (
	"encoding/json"
	"log"
	"os"
)

var electronprint = log.New(os.Stdout, "ELECTRONRESPONSE:", 0)

//OpenElectronWindow openbroser
func OpenElectronWindow(url string, width int, height int) {

	maps := make(map[string]interface{})
	maps["fname"] = "createWindow"

	args := make(map[string]interface{})
	args["url"] = url
	args["width"] = width
	args["height"] = height
	maps["args"] = args

	b, _ := json.Marshal(maps)

	electronprint.Println(string(b))
}

//OpenElectronUpdateDialog  open electron update dialog
func OpenElectronUpdateDialog(durl, oldv, nv string) {

	maps := make(map[string]interface{})
	maps["fname"] = "showMsgUpdate"

	args := make(map[string]string)
	args["url"] = durl
	args["cversion"] = oldv
	args["nversion"] = nv

	maps["args"] = args

	b, _ := json.Marshal(maps)

	electronprint.Println(string(b))
}
