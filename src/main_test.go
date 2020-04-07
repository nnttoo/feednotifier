package main

import (
	"log"
	"testing"
)

func TestGetTagFromURL(t *testing.T) {
	str := getTagFromURL("https://github.com/nnttoo/feednotifier/releases/tag/v0.0002")
	log.Println(str + "sssssssssss")
	if str != "v0.0002" {
		t.Error("gak cocok")
	}
}

func TestUpdate(t *testing.T) {
	CheckUpdate()
}

func TestOpenElectronMsg(t *testing.T) {
	OpenElectronUpdateDialog(`ini sekadear "iniajaja"`, "v222", "v222")
	OpenElectronWindow(`ini sekadear "iniajaja"`, 100, 700)
}
