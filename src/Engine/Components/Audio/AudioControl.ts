import Mixer, { MixerProps, MixerUserOptions } from "./Mixer";
import Audio from "~Engine/Resource/Audio";
import { SceneAction_Audio, SceneActionType } from "~Engine/Scene/SceneAction";
import { AudioSource } from "./AudioSource";
import Resources from "~Engine/Resource/Resources";

export default class AudioControl {
    constructor(options: AudioControlProps) {
        this.mainMixer = new Mixer(options.mainMixerProps)
        this.resourcesControl = options.resourcesControl
        let initArray: Array<[string, Track]> = []
        for (const track of options.tracks) {
            initArray.push([track.name,
            TrackFactory.newTrack(track)])
        }
        this.trackMap = new Map(initArray)
    }
    mainMixer: Mixer
    trackMap: Map<string, Track>
    resourcesControl: Resources
    switchToState(state: AudioControlState) {

    }
    setState(action: SceneAction_Audio, prevState?: AudioControlState) {
        switch (action.type) {
            case SceneActionType.au_play_source:
                let track = this.trackMap.get(action.trackId)
                if (track) {
                    let audio = this.resourcesControl.get(action.resId) as Audio
                    if (audio.value) {
                        let source = track.mixer.createSource(audio.value)
                        track.childSourcesMap.set(action.resId, source)
                        track.mixer.play(action.resId)
                    } else {
                        audio.preload().then(() => {
                            let source = track.mixer.createSource(audio.value)
                            track.childSourcesMap.set(action.resId, source)
                            track.mixer.play(action.resId)
                        })
                    }

                }
                break;
            case SceneActionType.au_stop_source:

            case SceneActionType.au_mute_track:
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
    resourcesControl: Resources
}
export interface AudioControlState {
    mainMixerProps: MixerProps
    tracks: Map<string, TrackProps>
}
export interface TrackProps {
    name: string,
    mixerUserOptions: MixerUserOptions,
    childSourcesMap: Map<string, AudioSource>
}
export interface Track {
    mixer: Mixer
    childSourcesMap: Map<string, AudioSource>
}
export class TrackFactory {
    static newTrack(props: TrackProps) {
        let map: Map<string, AudioSource> = props.childSourcesMap ? props.childSourcesMap : new Map()
        return {
            mixer: new Mixer({ ...props.mixerUserOptions, actionDelete: (id) => { }, sourceMap: map }),
            childSourcesMap: map
        } as Track
    }
}

