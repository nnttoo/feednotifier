/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = electron;

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// v1 

const electron =  __webpack_require__(2)
const {app, BrowserWindow, Menu ,dialog} =electron  
const { fork } = __webpack_require__(5);
 

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required'); // audio auto play

const path = __webpack_require__(0)
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
    const createLinuxDesktopFile = __webpack_require__(6)
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

    showMsgUpdate : __webpack_require__(7)

}
 
 
app.on('window-all-closed', function () { 
  if (process.platform !== 'darwin') app.quit();     
  subProcess.kill("SIGINT")
}) 


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


var fs = __webpack_require__(1);
const path = __webpack_require__(0)
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
  Exec="`+shpath+`"
  Icon=`+iconpath+`
  Categories=Web;News;Read
    `
    fs.writeFileSync(desktoppath, desktopfile, 'utf-8');
}

module.exports=createDesktop

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const { dialog,shell } = __webpack_require__(2)

function showUpdateDialog(obj){
    var objs = {
          url : "",
          cversion : "",
          nversion : ""
    }

    Object.assign(objs,obj)

    const options = {
        type: 'question',
        buttons: ['Cancel', 'Download'],
        defaultId: 2,
        title: 'Manual Update',
        message: "You are using the "+objs.cversion+" version, the "+objs.nversion+" version has been released, download the new version?", 
        checkboxChecked: true,
      };
    
      dialog.showMessageBox(null, options, (response) => { 
            if(response == 1){ 
                  shell.openExternal(objs.url)
            }
      });
} 

module.exports = showUpdateDialog

/***/ })
/******/ ]);