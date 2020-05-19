const assert = require('chai').assert;  

async function testFeedParser(){
    const Feedparser = require('../../electronapps/src/feedparser')    
    const FeedCten = require('../../electronapps/src/feedCtn')
    
    var feedparser = new Feedparser()
    await feedparser.loadUrl('https://www.upwork.com/ab/feed/topics/rss?securityToken=7666a0b0cc208a4ed16c9f8cb1fb5094195772a77a65dcd96df554eb029996ada33294eb3998ef7aeb7254fb36e5e851543c183cf28e1419ac4e8b08b22a3abe&userUid=872545499606274048&orgUid=872545499610468353&topic=4735165')
            
    console.log(feedparser.getTitle()) 
    var jsonarr = feedparser.getContents(10);

    /** @type {FeedCten[]} */
    var obj = JSON.parse(jsonarr);

    for(var i=0;i<obj.length;i++){
        console.log(obj[i].ShortDescription)
    }

}


describe('App', function(){
    describe('getTitle()', function(){
        it('sayHello should return hello', async function(){  
            testFeedParser()
        }); 
    }); 
});