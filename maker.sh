export PATH="$(pwd)/node_modules/.bin:$PATH"

 
buildWebpack(){
	cd ./backendApps
	webpack --mode production
	cd ../
	cd ./reactapps
	webpack --mode production
	cd ../
}

case "$1" in
"WebPackBuild")	
	buildWebpack
	;;
"WebPackWatch")
	cd ./reactapps
	webpack --watch --mode=production
	;;

"WebpackServ")
	webpack-dev-server --mode development --open
	;;

"DeployLinux")
	buildWebpack
	cd ./output  
	npm run package-linux
	;;

"DeployMac")
	buildWebpack
	cd ./output  
	npm run package-mac
	;;

"DeployWindow32")
	buildWebpack
	cd ./output  
	npm run package-win
	;;

"GuiDebug") 
	buildWebpack
	cd ./output/ 
	npm start debug=debug
	;;   
"test")
	cd ./unitTest
	npm test
	;;
"TestRun")
	cd ./output/ 
	npm start debug=debug
	;;

##create INSTALL.sh for linux user
"CreateLinuxRun")
	mkdir ./electronbuilder/release-builds
	cd ./electronbuilder/release-builds
	rm INSTALL.sh
	echo -e "#!/bin/sh \n./feednotifier-linux-x64/feednotifier installmode=i" >> ./INSTALL.sh
	;;
"testBuild")
	cd ./backendApps
	webpack --mode production
	cd ../
	;;

esac