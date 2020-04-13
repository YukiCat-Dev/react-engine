import Audio, { AudioType } from "../../Resource/Audio"

export default class AudioCtrl{
    constructor(){
        
    }
    private _eleBGM:HTMLAudioElement=document.createElement('audio')
    private _eleBGS:Array<HTMLAudioElement>=[]
    private _eleCV:Array<HTMLAudioElement>=[]

    public preRender(type:AudioType){
        switch(type){
            case AudioType.bgm:
                
        }
    }

    public playBGM(url:string){

    }
    
}