
const os = require('os')
const path = require('path')
var fs = require('fs');

class ServerSys{
    constructor(){
        this.appdirpath = ''
        this.getAppDir()
    }


    getAppDir(){
        var homedir = os.homedir()
        var appdir = path.join(homedir,'upworknotifier')
        if(!fs.existsSync(appdir)){
            fs.mkdirSync(appdir)
        }
        this.appdirpath = appdir;
    }


    simpleReadExistFile(filename){ 
        var filepath = path.join(this.appdirpath,filename);
        return new Promise(function(resolve,reject){
            fs.exists(filepath,(ex)=>{
                if(ex){
                    fs.readFile(filepath,function(err,data){
                        resolve(data.toString())
                    })
                } else {
                    resolve("")
                }
            })            
        }) 
    }

    simpleWriteFile(filename, datastring){
        var filepath = path.join(this.appdirpath,filename);
        return new Promise(function(resolve,reject){
            fs.writeFile(filepath,datastring, function(er){
                if(er) {
                    reject(er)
                } else {
                    resolve("")
                }
            })
        })
    }

    savelistrss(arg,data){
        return this.simpleWriteFile('listfeed.json',arg)
    }

    getlistrss(){ 
        return this.simpleReadExistFile('listfeed.json') 
    }

    savedurl(arg,data){
        var fname = 'savedurl.json'
        if(data == null || data == ''){             
            return this.simpleReadExistFile(fname) 
        } else {
            return this.simpleWriteFile(fname,data)
        }  
    }

    config(arg, data){ 
        var fileconfigname = 'config.json'

        if(data == null || data == ''){             
            return this.simpleReadExistFile(fileconfigname) 
        } else {
            return this.simpleWriteFile(fileconfigname,data)
        } 
    }
    async feedctn(){
        return ''
    }

}

module.exports=ServerSys