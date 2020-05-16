const { dialog,shell } = require('electron')

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