import Engine from "./Engine/Engine";
import React from "react";
import ReactDom from 'react-dom'
import LoadingScreen from './Engine/Components/UI/LoadingScreen'
//load screen
function Game() {
    return (<div >
        <LoadingScreen text="Loading" interval={500}></LoadingScreen>
    </div>)
}
ReactDom.render(<Game/>, document.getElementById('Game'))

//init Engine
//window['GameEngine']=new Engine()
