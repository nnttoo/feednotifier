package main

import (
	"net"
	"net/http"

	rice "github.com/GeertJohan/go.rice"
)

//Version application version number
var Version = "v0.0003"

func runServer(ln net.Listener) {
	ricebox := rice.MustFindBox("../views/")
	fs := http.FileServer(ricebox.HTTPBox())
	myhttp := http.NewServeMux()
	myhttp.Handle("/", http.StripPrefix("", fs))
	myhttp.HandleFunc("/ajax", NewAjaxCreate)

	http.Serve(ln, myhttp)
}

func main() {

	ln, _ := net.Listen("tcp", "127.0.0.1:0")
	url := "http://" + ln.Addr().String()
	OpenElectronWindow(url, 420, 700)

	go CheckUpdate()

	runServer(ln)

	// // Create UI with basic HTML passed via data URI
	// ui, err := lorca.New(url, "", 400, 650)
	// if err != nil {
	// 	//log.Fatal(err)
	// }
	// defer ui.Close()
	// // Wait until UI window is closed
	// <-ui.Done()

}
