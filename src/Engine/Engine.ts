import { AudioType } from "./Resource/Audio";
import Resources, { ResourceType } from "./Resource/Resources";
import ResourceLoader from "./Resource/ResLoader";
import engineSetting from '../Project/engine.json'
import {createStore} from 'redux'
import AudioControl from "./Components/Audio/AudioControl";

export default class Engine {
    constructor() {
        this.ResourcesSet = new Resources(engineSetting.resources)
        this.AudioControl=new AudioControl({
            mainMixerOption:engineSetting.AudioControl.mainMixerOption,
            traces:engineSetting.AudioControl.traces
        })
    }
    public ResourcesSet: Resources
    public AudioControl:AudioControl
    async init() {
        let resSetting = JSON.parse(await (await ResourceLoader.getResourceByUrl(engineSetting.resourceSettingPath)).text())
        this.ResourcesSet.init(resSetting)
    }
    playMusic(resId: string, asType: AudioType) {
        let music = this.ResourcesSet.get(ResourceType.MUSIC, resId)
        if (music && music.isLoaded) {

        } else {
            //TODO:
        }
    }
}
export interface EngineSetting {
    resourceSettingPath: string
}