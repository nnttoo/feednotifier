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
  Icon="`+iconpath+`"
  Categories=Web;News;Read
    `
    fs.writeFileSync(desktoppath, desktopfile, 'utf-8');
}

module.exports=createDesktop