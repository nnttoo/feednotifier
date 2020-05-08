import RssContent from "./rsscontent" 

export default class RssInfo {
    constructor(){
        this.title = ""
        this.url = ""

        /** @type {RssContent[]} */
        this.rssContents = [] 
    } 

    countNewContent(){
        var counter = 0;
        this.rssContents.forEach((e,i)=>{
            if(e.NewContent){
                counter++;
            }
        })

        return counter;
    }

    /**
     * 
     * @param {RssInfo[]} obj 
     */
    static convertToClass(obj){
        /** @type {RssInfo[]} */
        var result = []
        obj.forEach((e,i)=>{
            var nclass = new RssInfo()
            Object.assign(nclass,e)
            result.push(nclass)
        })

        return result;
    }
}