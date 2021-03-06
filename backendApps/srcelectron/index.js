// v1 

const electron =  require('electron')
const {app, BrowserWindow, Menu ,dialog} =electron  
const { fork } = require('child_process');
 

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required'); // audio auto play

const path = require('path')
app.on('ready', openElectron)  
  
var mainWindow = null;
var subProcess = null;

//StartServer
function startServer(){
    subProcess = fork(path.join(__dirname,'mainExpress.js'));
    subProcess.on("message", function(data){
        var strdata = data.toString()
        mainWindow.loadURL(strdata)
    })

    subProcess.on("exit",function(){
        app.quit()
    })

}


function openElectron(){
    var option = { 
        webPreferences: {
        nodeIntegration: true
        },
        icon : path.join(__dirname, 'icon.png'),
        fullscreen : false , 
        kiosk : false,
        width : 470,
        height : 700
    } 
 
 
    mainWindow = new BrowserWindow(option)
    mainWindow.loadFile(path.join(__dirname,'views/loading.html'))
    startServer()
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
    const createLinuxDesktopFile = require('./linuxdesktopbuilder')
    createLinuxDesktopFile()
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
    },

    showMsgUpdate : require('./showUpdateDialog')

}
 
 
app.on('window-all-closed', function () { 
  if (process.platform !== 'darwin') app.quit();     
  subProcess.kill("SIGINT")
}) 
