import * as React from 'react';
import { TriParamColor, ColorUtil } from './ui';
import './progress.css'
export interface ProgressProps {
    color?: TriParamColor//TODO:实现
    scale?: number
}

export interface ProgressState {

}

class Progress extends React.Component<ProgressProps, ProgressState> {
    state = {}
    render() {
        let backgroundOverride: React.CSSProperties = this.props.color ?
            {
                background: ColorUtil.toCSSRule(this.props.color)
            } : {}
        let scaleOverride: React.CSSProperties = this.props.scale ?
            {
                transform: `scale(${this.props.scale}`
            } : {}
        let divs: Array<JSX.Element> = []
        for(let i=0;i<=6;i++){
            divs.push(<div key={i} style={backgroundOverride}></div>)
        }
        
        return (<div className="loadingio-spinner-spinner-b8df680h0kr"
            style={{ ...scaleOverride }}>
            <div className="ldio-7v66ye4x3ic">
                {divs}
                {/* <div></div><div></div><div></div><div></div><div></div><div></div><div></div> */}
            </div>
        </div>);
    }
}

export default Progress;