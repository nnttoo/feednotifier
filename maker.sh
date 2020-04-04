
case "$1" in
"WebPackWatch")
	webpack --watch --mode=development
	;;

"WebpackServ")
	webpack-dev-server --mode development --open
	;;

"DeployLinux")
	webpack --mode production 
	cd src 
	make build 
	cd ../electronbuilder 
	rm FeedNotifier.exe
	npm run package-linux
	;;

"DeployWindow32")
	webpack --mode production 
	cd src 
	make win32 
	cd ../electronbuilder 
	rm FeedNotifier
	npm run package-win
	;;

"GuiDebug")
	cd src 
	make debug
	cd ../electronbuilder/ 
	npm start debug=debug
	;;   

##create INSTALL.sh for linux user
"CreateLinuxRun")
	mkdir ./electronbuilder/release-builds
	cd ./electronbuilder/release-builds
	rm INSTALL.sh
	echo -e "#!/bin/sh \n./feednotifier-linux-x64/feednotifier installmode=i" >> ./INSTALL.sh


esac