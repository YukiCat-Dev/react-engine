import { BlobBasedHeavyResource } from "./BlobBasedHeavyResource"
import ResourceLoader from "./ResLoader"

export default class Audio extends BlobBasedHeavyResource {

    protected _value: undefined | AudioBuffer
    public set value(newValue: undefined | AudioBuffer) {
        this._value = newValue
    }
    async preload() {
        try {
            if (this.worker) {
                this.worker.postMessage(await ResourceLoader.getResourceByUrl(this.url))
                this.worker.onmessage = (e) => {
                    this._value = e.data
                    this.isLoaded = true
                }
            }
        } catch (e) {
            this.doDownGrade()
        }
    }
    doDownGrade() {
        this.value = new AudioContext().createBuffer(2,5,44100)
    }
    
}
export enum AudioType {
    undefined, bgm, bgs, cv
}