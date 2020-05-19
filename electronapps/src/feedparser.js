 

function getStringFromUrl(url){
    return new Promise((resolve, reject) => {
        const http      = require('http'),
              https     = require('https');

        let client = http;

        if (url.toString().indexOf("https") === 0) {
            client = https;
        }

        client.get(url, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(data);
            });

        }).on("error", (err) => {
            reject(err);
        });
    });
}
 

var DOMParser = require('xmldom').DOMParser;
const FeedCtn = require('./feedCtn')


/**
 * 
 * @param {Element} elem 
 * @param {String} selector 
 */
function simpleGetString(elem, tagname){ 

    /** @type {HTMLCollectionOf<HTMLElement>} */
    var selected = elem.getElementsByTagName(tagname)
    if(selected.length > 0){         
        return  selected[0].textContent
    }
    return ''
}


class FeedParser{
    constructor(){  
        this.feedRoot = null;
    }

    getTitle(){   
        return simpleGetString(this.feedRoot,'title'); 
    }

    


    /** @param {Number} max */
    getContents(max){  
        var items = this.feedRoot.getElementsByTagName('item');
        if(max > items.length){
            max = items.length;
        }

        var result = []

        for(var i=0;i<max;i++){
            var curItem = items[i]            
            var feedCtn = new FeedCtn();

            feedCtn.Title = simpleGetString(curItem,'title'); 
            feedCtn.Link = simpleGetString(curItem,'link'); 
            feedCtn.Content = simpleGetString(curItem,'content:encoded'); 
            feedCtn.Description = simpleGetString(curItem,'description'); 
            feedCtn.PubDate = simpleGetString(curItem,'pubDate');   

            var cleanDesk = feedCtn.Description.replace(/<[^>]*>?/gm, '');

            feedCtn.ShortDescription = cleanDesk.substr(0,100)            
            result.push(feedCtn)

        }

        return JSON.stringify(result)
    }


    async loadUrl(url){
        var strContent = await getStringFromUrl(url)   
        this.feedRoot = new DOMParser().parseFromString(strContent) 
    }
}

module.exports = FeedParser