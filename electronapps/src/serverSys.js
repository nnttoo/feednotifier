
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

    async getlistrss(){
        var listfeedjsonpath = path.join(this.appdirpath,'listfeed.json')
        if(!fs.existsSync(listfeedjsonpath)){
            return ''
        }

        var ctn = await  new Promise((resolve,reject)=>{
            fs.readFile(listfeedjsonpath,(err,data)=>{
                resolve(data.toString())
            })
        }) 

        return ctn
    }

}

module.exports=ServerSys