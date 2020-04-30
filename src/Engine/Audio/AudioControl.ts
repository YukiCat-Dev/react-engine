import Mixer, { MixerProps } from "./Mixer";
import Audio from "~Engine/Resource/Audio";
import AbstractException from "~Engine/Exception/AbstractException";

export default class AudioControl {
    constructor(options: AudioControlProps) {
        this.mainMixer = new Mixer(options.mainMixerProps)
        let initArray: Array<[string, Track]> = []
        for (const track of options.tracks) {
            initArray.push([track.name,
            TrackFactory.newTrack(track)])
        }
        this.trackMap = new Map(initArray)
    }
    mainMixer: Mixer
    trackMap: Map<string, Track>
    private _getTrack(track_name: string) {
        let track = this.trackMap.get(track_name)
        if (track) { return track } else { throw new AbstractException('不存在的track_name', '???')/*TODO:*/ }
    }
    loadSource(track_name: string, res_audio: Audio) {
        if (!res_audio.value) throw new AbstractException('应当在资源预载后调用', '???')//TODO:
        let mixer = this._getTrack(track_name).mixer
        mixer.addSource(res_audio.id, mixer.createSource(res_audio.value), true)
    }
    play(track_name: string, res_id: string) {
        this._getTrack(track_name).mixer.play(res_id)//TODO:Options
    }
    stop(track_name: string, res_id: string) {
        this._getTrack(track_name).mixer.stop(res_id)//TODO:Options
    }
    stopTrack(track_name: string) {
        this._getTrack(track_name).mixer.stopAll()//TODO:Fade Options
    }
    resumeTrack(track_name: string) {
        this._getTrack(track_name).mixer.resumeAll()//TODO:Fade Options
    }
    getGainOf(track_id: string, res_id?: string): AudioParam {
        if (res_id) {
            let gain = this._getTrack(track_id).mixer.getGainOf(res_id)
            if (gain) { return gain } else {
                throw new AbstractException('', '')//TODO:
            }
        } else {
            return this._getTrack(track_id).mixer.mainGain.gain
        }
    }
}
export interface AudioControlProps {
    mainMixerProps: MixerProps
    /**
     * 音轨集合。可以自行设置，例如：BGM\BGS\CV等...
     * @description 使用Set来保证元素不重复，与State存储中的键对应。
     * @type {Set<TrackProps>}
     * @memberof AudioControlProps
     */
    tracks: Set<TrackProps>
}
export interface AudioControlState {
    mainMixerProps: MixerProps
    tracks: Map<string, TrackProps>
}
export interface TrackProps {
    name: string,
    mixerUserOptions: MixerProps,
}
export interface Track {
    name: string
    mixer: Mixer
}
/**
 * 构建新的Track对象的静态工厂类
 *
 * @author KotoriK
 * @export
 * @class TrackFactory
 */
export class TrackFactory {
    static newTrack(props: TrackProps) {
        return {
            mixer: new Mixer({ ...props.mixerUserOptions }),
            name: props.name
        } as Track
    }
}

