const assert = require('chai').assert;  
const ServerSys = require('../../electronapps/src/serverSys')
 


describe('App', function(){
    describe('sayHello()', function(){
        it('sayHello should return hello', function(){  

            var mysys = new ServerSys()
            mysys.getlistrss().then(d=>{
                console.log(d)
            })

        }); 
    }); 
});