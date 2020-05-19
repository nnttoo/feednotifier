const HTMLParser = require('node-html-parser');

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


class FeedParser{
    constructor(){ 
        this.strContent = ""
    
    }

    async getTitle(){

    }

    async loadUrl(url){
        this.strContent = await getStringFromUrl(url)
        console.log(this.strContent);
    }
}

module.exports = FeedParser