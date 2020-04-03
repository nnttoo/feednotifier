BINFILE=FeedNotifier
TARGETFOLDER=electronbuilder
DIRTARGET=../$(TARGETFOLDER)


#jangan lupa untuk mengganti space dengan tab
# karena make file sensitif terhadap hal ts
# indent harus menggunakan tab bukan space

debug:
	go build -o $(DIRTARGET)/$(BINFILE)

build: 
	rice embed-go; \
	go build -o $(DIRTARGET)/$(BINFILE)
	rm rice-box.go

win: bwicon64
	rice embed-go
	GOOS=windows \
	GOARCH=amd64 \
	CGO_ENABLED=1 \
	CC=x86_64-w64-mingw32-gcc \
	CXX=x86_64-w64-mingw32-g++ \
	go build -ldflags "-H windowsgui" \
	-o $(DIRTARGET)/$(BINFILE).exe
	rm rice-box.go
	rm icon_windows.syso

bwicon64:
	x86_64-w64-mingw32-windres icon.rc -o icon_windows.syso

win32:	bwicon32 
	rice embed-go
	GOOS=windows \
	GOARCH=386 \
	CGO_ENABLED=1 \
	CC=i686-w64-mingw32-gcc \
	CXX=i686-w64-mingw32-g++ \
	go build -ldflags "-H windowsgui" \
	-o $(DIRTARGET)/$(BINFILE).exe
	rm rice-box.go
	rm icon_windows.syso
mac:
	GOOS=linux GOARCH=amd64 \
	go build  -o $(DIRTARGET)/$(BINFILE)_darwin

bwicon32:
	i686-w64-mingw32-windres icon.rc -o icon_windows.syso

raspi:
	rice embed-go
	env GOOS=linux  \
	GOARCH=arm GOARM=7  \
	CGO_ENABLED=1  \
	CC=arm-linux-gnueabihf-gcc  \
	go build --tags "linux" \
	-o  $(DIRTARGET)/raspi/$(BINFILE)
	rm rice-box.go

#jangan pake DIRTARGET sebab ini beda direktory
run:
	cd ../; \
	$(TARGETFOLDER)/linux/gui/resources/app/$(BINFILE) 

clean:
	rm  -f $(DIRTARGET)/raspi/$(BINFILE)
	rm  -f $(DIRTARGET)/win32/$(BINFILE).exe 
	rm  -f $(DIRTARGET)/win64/$(BINFILE).exe
	rm  -f $(DIRTARGET)/$(BINFILE)

list:
	@grep '^[^#[:space:]].*:' Makefile

brun : build run