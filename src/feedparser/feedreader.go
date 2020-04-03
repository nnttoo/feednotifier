package feedparser

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	strip "github.com/grokify/html-strip-tags-go"

	"github.com/antchfx/xmlquery"
)

func simpleGetString(curnode *xmlquery.Node, selector string) string {
	n := xmlquery.FindOne(curnode, selector)
	if n == nil {
		return ""
	}
	return n.InnerText()
}

func subString(str string, pos int, end int) string {
	if end >= len(str) {
		end = len(str)
	}
	runes := []rune(str)
	// ... Convert back into a string from rune slice.
	safeSubstring := string(runes[pos:end])
	return safeSubstring
}

//FeedParser struct
type FeedParser struct {
	ctnbyte []byte
	time    int64
}

//LoadPage save content byte
func (i *FeedParser) LoadPage(url string) {
	res, err := http.Get(url)
	if err != nil {
		log.Panic(err)
	}
	defer res.Body.Close()

	b, e := ioutil.ReadAll(res.Body)
	if e != nil {
		log.Panic(e)
	}
	res.Body.Close()
	i.ctnbyte = b
	i.time = time.Now().Unix()
}

func (i *FeedParser) getDoc() *xmlquery.Node {
	sreader := bytes.NewReader(i.ctnbyte)
	doc, err := xmlquery.Parse(sreader)
	if err != nil {
		log.Panic(err)
		return nil
	}

	return doc
}

//GetTitle getTitle
func (i *FeedParser) GetTitle() string {
	doc := i.getDoc()
	if doc == nil {
		return ""
	}
	list := xmlquery.Find(doc, "//title")
	return list[0].InnerText()
}

//GetContents getcontent from feed
func (i *FeedParser) GetContents(max int) string {
	doc := i.getDoc()
	if doc == nil {
		return ""
	}

	listitem := xmlquery.Find(doc, "//item")

	if max > len(listitem) {
		max = len(listitem)
	}

	listresult := make([]FeedCtn, 0)

	for x := 0; x < max; x++ {
		curnode := listitem[x]

		f := FeedCtn{}
		f.Title = simpleGetString(curnode, "//title")
		f.Description = simpleGetString(curnode, "//description")
		f.Link = simpleGetString(curnode, "//link")
		f.Content = simpleGetString(curnode, "//content:encoded")
		f.PubDate = simpleGetString(curnode, "//pubDate")

		f.ShortDescription = subString(strip.StripTags(f.Description), 0, 100)

		listresult = append(listresult, f)
	}

	b, _ := json.Marshal(listresult)
	result := string(b)

	return result
}
