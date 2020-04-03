import RssContent from "./rsscontent" 

export default class RssInfo {
    constructor(){
        this.title = ""
        this.url = ""

        /** @type {RssContent[]} */
        this.rssContents = []
    }
}