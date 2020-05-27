import React from 'react' 
import './rssFeedCtnRBar.css'
import RssFeedCtnRBarAnim from './rssFeedCtnRBarAnim'
import rssFeedCtnShare from './rssFeedCtnShare'

export default class RssFeedCtnRbar extends React.Component{
    constructor(p){
        super(p)
        this.rssBarAnim = new RssFeedCtnRBarAnim() 
    }

    componentDidMount(){
        this.rssBarAnim.mount()
    }

    componentWillUnmount(){
        this.rssBarAnim.unMount()
    }

    render(){
        return (
            <div ref={this.rssBarAnim.elemReact}>
                <div className="rbar" >
                    <div className="ctn">
                        <div className="ssegment">
                            <h3 className="smalltitle">Feed :</h3>
                            <div className="rsslist">
                                    
                            </div>
                        </div>
                    </div>

                    <div className="bottomel tbframe"> 
                        <div className="tc tcnwrap tcvm">
                            RSS Url :
                        </div>
                        <div className="tc tcnwrap tcvm iptparent">
                            <input  type="text" className="form-control addinput"/>
                        </div>                   
                    
                        <div className="tc tcnwrap tcvm ">
                            <button  className="btn btn-primary">add</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}