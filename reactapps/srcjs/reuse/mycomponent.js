
import React from 'react';
import AppCtx from './appctx';
window.AppCtx = new AppCtx()

export default class MyComponent extends React.Component{
    constructor(props){
        super(props);
        /** @type {AppCtx} */
        this.AppCtx = window.AppCtx;
    }
}