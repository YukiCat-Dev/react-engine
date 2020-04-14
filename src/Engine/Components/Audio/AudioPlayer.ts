import AudioEffects from "./AudioEffects"

/**
 * @description 旨在包装AudioContext(Web Audio API)中的一些常用功能
 * @author KotoriK
 * @date 2020-04-13
 * @export
 * @class AudioPlayer
 * @deprecated
 */
export default class AudioPlayer //TODO:extends EventTarget 
{
    constructor(options?: AudioContextOptions) {
        this.native_ctx = new AudioContext(options)
        this.native_gainNode = this.native_ctx.createGain()
        this.native_gainNode.connect(this.native_ctx.destination)
    }
    /**
     * @description 访问原生AudioContext对象
     * @type {AudioContext}
     * @memberof AudioPlayer
     */
    readonly native_ctx: AudioContext
    /**
     * @description 访问原生增益控制节点
     * @type {GainNode}
     * @memberof AudioPlayer
     */
    readonly native_gainNode: GainNode
    private _native_sourceNode: AudioBufferSourceNode | null = null
    /**
     * 只读。访问原生音源节点。会根据audioBuffer自动创建
     *
     * @readonly
     * @type {(AudioBufferSourceNode | null)}
     * @memberof AudioPlayer
     */
    public get native_sourceNode(): AudioBufferSourceNode | null {
        return this._native_sourceNode
    }
    private _audioBuffer: AudioBuffer | null = null
    public get audioBuffer(): AudioBuffer | null {
        return this._audioBuffer
    }
    public set audioBuffer(value: AudioBuffer | null) {
        if (this._state != AudioPlayerState.closing) {
            if (this._state != AudioPlayerState.empty) {
                //先停止
                this.stop()
            }
            this._audioBuffer = value
            if (!value) {//若value非空，自动创建AudioBufferSourceNode
                this._createSource()
                this._state = AudioPlayerState.loaded
            }else{
                this._state=AudioPlayerState.empty
            }
        }
    }
    private _createSource() {
        this._native_sourceNode = this.native_ctx.createBufferSource()
        this._native_sourceNode.addEventListener('ended', () => {
            this._native_sourceNode = null
            this._state = AudioPlayerState.loaded
        })
    }
    private _state: AudioPlayerState = AudioPlayerState.empty
    /**
     * 指示内部状态。
     *
     * @readonly
     * @type {AudioPlayerState}
     * @memberof AudioPlayer
     */
    public get state(): AudioPlayerState {
        return this._state
    }

    /**
     * 加载资源
     *
     * @author KotoriK
     * @date 2020-04-13
     * @param {Blob} blob
     * @memberof AudioPlayer
     */
    async load(blob: Blob) {
       return this.native_ctx.decodeAudioData(await blob.arrayBuffer())
            .then((buf) => {

                this.audioBuffer = buf
            })/* .catch((reason)=>{
                console.error('')
            }) */
    }

    /**
     * 执行播放。暂停后再恢复播放不应调用此方法，而是resume()。
     *
     * @author KotoriK
     * @date 2020-04-13
     * @param {PlayOption} [option]
     * @memberof AudioPlayer
     */
    play(option?: PlayOption) {
        //检查buffer是否已载入
        if (this._native_sourceNode) {
            this._native_sourceNode.connect(this.native_ctx.destination)
            if (option) {
                if (option.loop) {
                    this._native_sourceNode.loop = true
                }
                option.gain ? this.native_gainNode.gain.value = option.gain : null
                this._native_sourceNode.start(option.when, option.offset, option.duration)
            } else {
                this._native_sourceNode.start()
            }

            if (this.native_ctx.state == 'suspended') this.native_ctx.resume()
            this._state = AudioPlayerState.playing
        } else {
            if (this._audioBuffer) {
                this._createSource()
            }
        }

    }
    stop(when?: number) {
        if (this._native_sourceNode) {
            this._native_sourceNode.stop(when)
            //this._native_sourceNode = null  在事件回调中触发
        }
    }
    /**
     * 淡出并停止。若不想停止，可以直接调用AudioEffects类的方法
     *
     * @author KotoriK
     * @date 2020-04-13
     * @param {number} duration
     * @memberof AudioPlayer
     */
    stopWithFadeOut(duration: number) {
        AudioEffects.fade_exp(this.native_gainNode, 0, duration)
        this.stop(this.native_ctx.currentTime + duration + 1)
    }
    /**
     * 暂停。使用AudioContext.suspend()方法。
     *
     * @author KotoriK
     * @date 2020-04-13
     * @memberof AudioPlayer
     */
    pause() {
        this._state = AudioPlayerState.paused
        return this.native_ctx.suspend()
    }
    /**
     * 恢复播放。使用AudioContext.resume()方法。
     *
     * @author KotoriK
     * @date 2020-04-13
     * @memberof AudioPlayer
     */
    resume() {
        this._state = AudioPlayerState.playing
        return this.native_ctx.resume()
    }
    /**
     *
     * 关闭并释放相关资源
     * @author KotoriK
     * @date 2020-04-13
     * @memberof AudioPlayer
     */
    async close() {
        await this.native_ctx.close()
        this.audioBuffer = null
        this._state = AudioPlayerState.closing
        return
    }

    //TODO:EventTarget

    

}
/**
 * 与播放有关的选项
 *
 * @author KotoriK
 * @date 2020-04-13
 * @export
 * @interface PlayOption
 */
export interface PlayOption {
    /**
     * 指示是否循环
     *
     * @type {boolean}
     * @memberof PlayOption
     */
    loop?: boolean
    /**
     * 指示在多久后开始播放
     *
     * @type {number}
     * @memberof PlayOption
     */
    when?: number
    /**
     * 指示离buffer的开头多少偏移量的地方开始播放
     *
     * @type {number}
     * @memberof PlayOption
     */
    offset?: number
    duration?: number
    /**
     * 初始音量。若设置了淡入，则会在指定时间后达到初始音量。
     *
     * @type {number}
     * @memberof PlayOption
     */
    gain?: number
    /**
     * 淡入效果时间。设置为-1或不传递来禁止。
     *
     * @type {number}
     * @memberof PlayOption
     */
    fadeInDuration?: number

}
export enum AudioPlayerState {
    /**
     * 指示AudioBuffer是否已装载
     */
    empty, 
    /**
     * 指示AudioBuffer是否已装载
     */
    loaded, 
    playing, paused, closing
}