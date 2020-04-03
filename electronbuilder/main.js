// v1
process.env.NODE_ENV = 'production'; 

const electron = require('electron')
const {app, BrowserWindow, Menu ,dialog} =electron
 

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

var fs = require('fs');
const path = require('path')
app.on('ready', startServer)
var spawn = require('child_process').spawn


function createDesktop(){
  var desktoppath = path.join(__dirname,"../../../feednotifierCreate.desktop"); 
  var shpath = path.join(__dirname,"../../feednotifier");  //ganti appnya
  var iconpath = path.join(__dirname,"icon.png");
  var desktopfile = `
[Desktop Entry]
Encoding=UTF-8
Version=1.0
Name=FeedNotifier
GenericName=FeedNotifier
Type=Application
Exec=`+shpath+`
Icon=`+iconpath+`
Categories=Web;News;Read
  `
  fs.writeFileSync(desktoppath, desktopfile, 'utf-8');
}

/**
 * @typedef {Object} ElectResponseArg
 * @property {string} fname
 * @property {Object[]} args
 */

var ls;
function startServer(){
    var ext = ""
    if(process.platform === "win32"){
        ext = ".exe";
    } else if (process.platform === "darwin"){
        ext = '_darwin';
    }

    var pathexec = path.join(__dirname, 'FeedNotifier' + ext ); 
    ls    = spawn(pathexec);
    ls.stdout.on('data', function (data) {
        /** @type {string} */
        var stdout = data.toString(); 
        if(stdout.startsWith("ELECTRONRESPONSE:")){
            var jsoncode = stdout.substring("ELECTRONRESPONSE:".length);
            
            try {                
                /** @type {ElectResponseArg} */
                var electresponse = JSON.parse(jsoncode);
                exposeFun[electresponse.fname](electresponse.args);
            } catch (error) {
                console.log(error);
                console.log(jsoncode);
                console.log(electresponse);

             }

        } else {
            console.log(stdout) 
        }
    });
  
    ls.stderr.on('data', function (data) {
        console.log('stderr: ' + data.toString());
    });
    
    ls.on('exit', function (code) {
        console.log('child process exited with code ');
    });
}

    
 

 
// Disable error dialogs by overriding
dialog.showErrorBox = function(title, content) {
    console.log(`${title}\n${content}`);
};
 

function getParameter(name,str) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('^' + name + '=([^ ]*)');
  var results = regex.exec(str);
  return results === null ? '' : results[1];
};


function parseAllArg(name){
    for(var x=0;x<process.argv.length;x++){
        var cursarg = process.argv[x];
        var result = getParameter(name,cursarg)
        if(result != ''){
          return result;
        }
    }

    return ''
}


if(parseAllArg("installmode") != ""){
   createDesktop()
}



var exposeFun = {
    createWindow : function(obj){ 
        var option = { 
            webPreferences: {
            nodeIntegration: true
            },
            icon : path.join(__dirname, 'icon.png'),
            fullscreen : false , 
            kiosk : false 
        }

        Object.assign(option,obj)


        var mainWindow = new BrowserWindow(option)

        //mainWindow.maximize(); 
        //mainWindow.setMenu(menu);

        if(parseAllArg("debug") != "debug"){
            Menu.setApplicationMenu(new Menu()) 
            mainWindow.setMenuBarVisibility(false)
        } 

        // and load the index.html of the app.
        mainWindow.loadURL(obj.url)  
        mainWindow.on('closed', function () { 
            ls.kill('SIGINT')
            mainWindow = null
        }) 
    }
}
 
 
app.on('window-all-closed', function () { 
  if (process.platform !== 'darwin') app.quit();  
  ls.kill('SIGINT')
}) 
