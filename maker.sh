export PATH="$(pwd)/node_modules/.bin:$PATH"

case "$1" in
"WebPackBuild")	
	cd ./reactapps
	webpack --mode production
	;;
"WebPackWatch")
	cd ./reactapps
	webpack --watch --mode=development
	;;

"WebpackServ")
	webpack-dev-server --mode development --open
	;;

"DeployLinux")
	cd ./reactapps
	webpack --mode production  
	cd ../output  
	npm run package-linux
	;;

"DeployMac")
	webpack --mode production 
	cd src 
	make mac 
	cd ../electronbuilder 
	rm ./FeedNotifier.exe
	rm ./FeedNotifier
	npm run package-mac
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
	cd ./electronapps
	webpack --mode production 
	cd ../output/ 
	npm start debug=debug
	;;   
"run")
	cd src
	make run
	;;

##create INSTALL.sh for linux user
"CreateLinuxRun")
	mkdir ./electronbuilder/release-builds
	cd ./electronbuilder/release-builds
	rm INSTALL.sh
	echo -e "#!/bin/sh \n./feednotifier-linux-x64/feednotifier installmode=i" >> ./INSTALL.sh


esac