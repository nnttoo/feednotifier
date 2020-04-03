
const electron = require('electron')
var shell = electron.shell;
const remote = electron.remote
const Menu = remote.Menu;
const clipboard = electron.clipboard

function focusWindow(){
    var w = remote.getCurrentWindow();
    w.focus()
}

function playSound(){
    document.getElementById("myaudio").play()
}

function openLinkExternal(link){ 
    if(link == null || typeof(link) == "undefined" || link == "" ){
        return
    }
    shell.openExternal(link);
}




const InputMenu = Menu.buildFromTemplate([{
        label: 'Undo',
        role: 'undo',
    }, {
        label: 'Redo',
        role: 'redo',
    }, {
        type: 'separator',
    }, {
        label: 'Cut',
        role: 'cut',
    }, {
        label: 'Copy',
        role: 'copy',
    }, {
        label: 'Paste',
        role: 'paste',
    }, {
        type: 'separator',
    }, {
        label: 'Select all',
        role: 'selectall',
    },
]);

function showInputMenu(){
    InputMenu.popup(remote.getCurrentWindow());
}



// document.body.addEventListener('contextmenu', (e) => { 
//     e.preventDefault();
//     e.stopPropagation();

//     let node = e.target;

//     while (node) {
//         if (node.nodeName.match(/^(input|textarea)$/i) || node.isContentEditable) {
//             InputMenu.popup(remote.getCurrentWindow());
//             break;
//         }
//         node = node.parentNode;
//     }
// });
 