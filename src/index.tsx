{/* react-engine
Copyright (C) 2020  Yukicat-Dev

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Though not marked now, all of the source code are protected under the terms of GNU GPL v3.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>. */}
import Engine from "./Engine/Engine";
import React from "react";
import ReactDom from 'react-dom'
import LoadingScreen from './Engine/UI/LoadingScreen'
//load screen
function Game() {
    return (<div >
        <LoadingScreen text="Loading" interval={500}></LoadingScreen>
    </div>)
}
ReactDom.render(<Game/>, document.getElementById('Game'))

//init Engine
//window['GameEngine']=new Engine()
