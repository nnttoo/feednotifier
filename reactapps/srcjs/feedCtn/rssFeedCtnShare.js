/**
 * Share variable between react componen for all rssFeed section
 */
import React from 'react'; 
var rssFeedCtnShare = {
 
    /** @type {React.RefObject<HTMLElement>} */
    elemFeedCtn : React.createRef() ,



    /** 
     * for typing only
     * cant use normal import because it will cause circular dependencies 
     * @type {import('./rssFeedCtn').default}
     *  **/
     rssFeedCtn : null,


}
 

export default rssFeedCtnShare