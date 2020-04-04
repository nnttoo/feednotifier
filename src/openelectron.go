package main

import (
	"log"
	"os"
)

var electronprint = log.New(os.Stdout, "ELECTRONRESPONSE:", 0)

//OpenElectronWindow openbroser
func OpenElectronWindow(url string, width string, height string) {

	electronprint.Println(`
		{
			"fname" : "createWindow",
			"args" : {
					"url" : "` + url + `",
					"width" : ` + width + `,
					"height" : ` + height + `
				} 
		}
	`)
}
