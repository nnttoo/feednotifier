const assert = require('chai').assert;  
const Feedparser = require('../../electronapps/src/feedparser')
  
var feedparser = new Feedparser()

describe('App', function(){
    describe('sayHello()', function(){
        it('sayHello should return hello', function(){  
            feedparser.loadUrl('https://www.upwork.com/ab/feed/topics/rss?securityToken=7666a0b0cc208a4ed16c9f8cb1fb5094195772a77a65dcd96df554eb029996ada33294eb3998ef7aeb7254fb36e5e851543c183cf28e1419ac4e8b08b22a3abe&userUid=872545499606274048&orgUid=872545499610468353&topic=4735165')
        }); 
    }); 
});