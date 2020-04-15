import * as React from 'react';
import { TriParamColor } from './ui';
import Background, { BackgroundType } from './Background';
import Progress from './Progress';
export interface LoadingScreenProps {
    background_color?: TriParamColor
    text: string
    interval: number
}



export interface LoadingScreenState {
    p: string
}

class LoadingScreen extends React.Component<LoadingScreenProps, LoadingScreenState> {
    state = { p: this.props.text }
    _interval = 0
    componentDidMount() {
        this._interval = setInterval(() => {
            this.setState((prev) => {
                let dots = prev.p.replace(this.props.text, '')
                if (dots.length < 3) {
                    dots += '.'
                } else {
                    dots = ""
                }
                return { p: this.props.text + dots }
            })
        }, this.props.interval)
    }
    componentWillUnmount() {
        clearInterval(this._interval)
    }
    render() {

        return (<Background type={BackgroundType.Color}
            data={this.props.background_color ? this.props.background_color : { r: 0, g: 0, b: 0 }}>
            <div style={{ top: '70%', left: '70%', color: 'rgb(255,255,255)', position: "absolute" }}>
                <Progress color={{r:125,g:200,b:50}} scale={1}/>
                <p style={{marginLeft:'38%',marginTop:"-10%"}}>{this.state.p}</p>
            </div>
        </Background>)
    }
}

export default LoadingScreen;