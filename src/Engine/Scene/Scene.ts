import { ProcessedCard } from "./Card";
import { MarkedAbstractResource } from "../Resource/ResourceControl";
import Engine from "../Engine";
import { SceneAction, SceneActionType } from "./SceneAction";

/**
 * 
 *
 * @export
 * @class Scene
 */
export default class Scene {
    constructor(cards: Array<ProcessedCard>, res: Map<string, MarkedAbstractResource>, engine: Engine) {
        this._cards = cards
        this._res = res
        this.engine = engine
    }
    public readonly engine: Engine
    private _cards: Array<ProcessedCard> = []
    private _res: Map<string, MarkedAbstractResource>
    public async run() {
        for (const card of this._cards) {
            let actions = [...card.actions]
            for (const action of actions) {
                await this.performAction(action)
            }
        }
    }
    public preloadResources() {
        for (const res of this._res.values()) {
            res[1].preload()
        }
    }
    public unloadResources() {
        for (const res of this._res.values()) {
            res[1].unload()
        }
    }
    public unloadUnused(usefulRes_resId: Array<string>) {
        for (const item of usefulRes_resId) {
            let res = this._res.get(item)
            if (res) res[0] = true//标记要用的
        }
        for (const res of this._res.values()) {
            if (res[0]) { res[0] = false } else { res[1].unload() }
        }

    }
    public unloadAll(){

    }
    public async performAction(action: SceneAction) {
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

