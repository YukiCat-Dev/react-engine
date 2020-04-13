import { AudioType } from "./Resource/Audio";
import Resources, { ResourceType } from "./Resource/Resources";
import ResourceLoader from "./Resource/ResLoader";
import engineSetting from '../Project/engine.json'
import {createStore} from 'redux'

export default class Engine {
    constructor() {
        this.ResourcesSet = new Resources()
    }
    public ResourcesSet: Resources
    
    async init() {
        let resSetting = JSON.parse(await (await ResourceLoader.getResourceByUrl(engineSetting.resourceSettingPath)).text())
        this.ResourcesSet.init(resSetting)
    }
    playMusic(resId: string, asType: AudioType) {
        let music = this.ResourcesSet.get(ResourceType.Music, resId)
        if (music && music.isLoaded) {

        } else {
            //TODO:
        }
    }
}
export interface EngineSetting {
    resourceSettingPath: string
}