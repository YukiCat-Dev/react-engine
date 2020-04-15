import * as React from 'react';
import { RGBColor, TriParamColor, ColorUtil } from './ui';
import Video from '../../Resource/Video';
import Image from '../../Resource/Image';

/**
 * 
 *
 * @export
 * @interface BackgroundProps
 */
export interface BackgroundProps {
    type: BackgroundType
    data: Image | Video | TriParamColor
}

export interface BackgroundState {

}

class Background extends React.Component<BackgroundProps, BackgroundState> {
    //state = { :  }
    render() {
        let background: JSX.Element, data = this.props.data
        let divCSS: React.CSSProperties = { position: 'absolute', width: '100vw', height: '100vh' }
        switch (this.props.type) {
            case BackgroundType.Color:
                let colorString: string = ''
                colorString = ColorUtil.toCSSRule(data)
                background = (<div style={{ ...divCSS, backgroundColor: colorString }}>{this.props.children}</div>)
                break
            case BackgroundType.Image:
                background = (<div style={{ ...divCSS, backgroundImage: data.value }}>{this.props.children}</div>)
                break;
            default:
                background = (<div style={divCSS}></div>)
        }
        return background;
    }
}

export default Background;

export enum BackgroundType {
    Color, Image, Video, Canvas
}
