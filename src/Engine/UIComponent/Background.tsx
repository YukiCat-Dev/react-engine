import * as React from 'react';

/**
 * 
 *
 * @export
 * @interface BackgroundProps
 */
export interface BackgroundProps {
    /**
     *
     * dataURL of Image Blob
     * @type {string}
     * @memberof BackgroundProps
     */
    image?:string
    
    video?:string
}
 
export interface BackgroundState {
    
}
 
class Background extends React.Component<BackgroundProps, BackgroundState> {
    state = { :  }
    render() { 
        return this.props.render(this.state);
    }
}
 
export default Background;