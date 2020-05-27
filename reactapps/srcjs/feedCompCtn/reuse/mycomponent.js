
import React from 'react';   
import feedCtnContext from './context';

export default class MyComponent extends React.Component{
    constructor(props){
        super(props); 
        this.AppCtx = feedCtnContext.feedCtnSystem;
    }
}