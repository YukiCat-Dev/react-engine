
/**
 * 绑定SourceNode与GainNode，方便对单独SourceNode的增益调整。
 *
 * @author KotoriK
 * @export
 * @class AudioSource
 */
export class AudioSource{
    constructor(buf:AudioBuffer,ctx:AudioContext){
        this._source=ctx.createBufferSource()
        this._source.buffer=buf
        this._gain=ctx.createGain()
        this._source.connect(this._gain)
    }
    private _source:AudioBufferSourceNode
    private _gain:GainNode
    public get gain(){
        return this._gain.gain
    }
    connect(node:AudioNode){
        this._gain.connect(node)
    }
    start(when?:number,loop?:SourceNodeLoopOptions){
        if (loop) {
            this._source.loop = true
            if (loop.loopStart) this._source.loopStart = loop.loopStart
            if (loop.loopEnd) this._source.loopEnd = loop.loopEnd
        }
            this._source.start(when)
    }
    stop(when?: number) {
        this._source.stop(when)
    }
    on(type:'ended',listener:Function){
        this._source.addEventListener('ended',listener())
    }

}

export interface SourceNodeLoopOptions {
    loop: boolean
    loopStart?: number
    loopEnd?: number
}