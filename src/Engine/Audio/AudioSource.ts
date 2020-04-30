import AudioEffects, { FadeOption } from "./AudioEffects"
import { TimeUnit, Times } from "~Engine/util/time"
import sleep from "~Engine/util/sleep"

/**
 * 绑定SourceNode与GainNode，方便对单独SourceNode的增益调整。
 *
 * @author KotoriK
 * @export
 * @class AudioSource
 */
export class AudioSource {
    /**
     *Creates an instance of AudioSource.
     * @author KotoriK
     * @param {AudioBuffer} buf 要导入的音频缓存
     * @param {AudioContext} ctx 从属的AudioContext
     * @param {number} [defaultGainValue] 默认增益值，不传入的设为GainNode.gain.defaultValue
     * @memberof AudioSource
     */
    constructor(buf: AudioBuffer, ctx: AudioContext, defaultGainValue?: number) {
        this.buf = buf
        this.initSource()
        this._gain = ctx.createGain()
        if (defaultGainValue) {
            this.defaultGainValue = defaultGainValue
            this._gain.gain.setValueAtTime(defaultGainValue, 0)
        } else {
            this.defaultGainValue = this._gain.gain.defaultValue
        }

        this._ctx = ctx
    }
    public readonly defaultGainValue: number
    private _state!: 'play' | 'stop' | 'ready'//已在initSource()初始化
    public get state() {
        return this._state
    }
    public buf: AudioBuffer
    private _ctx: AudioContext
    private _source!: AudioBufferSourceNode//已在initSource()初始化
    private _gain: GainNode
    public get gain() {
        return this._gain.gain
    }
    /**
     * 初始化AudioBufferSourceNode，亦可于用于
     *
     * @author KotoriK
     * @memberof AudioSource
     */
    initSource() {
        //TODO:是否需要对旧节点的处理？
        this._source = ctx.createBufferSource()
        this._source.buffer = this.buf
        this._source.connect(this._gain)
        this.on('ended', () => { this._state = 'stop' })
        this._state = "ready"
    }
    /**
     * 还原增益值为初始增益值
     *
     * @author KotoriK
     * @memberof AudioSource
     */
    setGainDefault() {
        this.gain.setValueAtTime(this.defaultGainValue, this._ctx.currentTime)
    }
    /**
     * 连接到指定的AudioNode
     *
     * @author KotoriK
     * @param {AudioNode} node
     * @memberof AudioSource
     */
    connect(node: AudioNode) {
        this._gain.connect(node)
    }
    start(options?: StartOptions) {
        if (options) {
            if (options.loop) {
                this._source.loop = true
                if (options.loop.loopStart) this._source.loopStart = options.loop.loopStart
                if (options.loop.loopEnd) this._source.loopEnd = options.loop.loopEnd
            }
            if (options.fade) {
                if (options.when) {
                    sleep(Times.convert({ value: options.when, unit: TimeUnit.Second }, TimeUnit.Microsecond).value).then(() => {
                        AudioEffects.fade(this._gain.gain, Object.assign(options.fade, { targetValue: this.defaultGainValue }))//TODO:为什么同样的语法，检查过不去?????????
                        this._start()
                    })
                } else {
                    AudioEffects.fade(this._gain.gain, { ...options.fade, targetValue: this.defaultGainValue })
                    this._start()
                }
                return
            }
            this._start(options.when)
            return
        }
        this._start()
    }
    private _start(when?: number) {
        try {
            this._source.start(when)
            this._state = 'play'
        } catch (e) {
            //failed silently
        }
    }
    /**
     *
     * 停止这个source的播放
     * @author KotoriK
     * @param {FadeOption} [fade_out] 同时设置了when时，会在指定的when后进行淡出
     * @param {number} [when] 在从现在开始算多久之后停止
     * @memberof AudioSource
     */
    stop(when?: number, fade_out?: FadeOption) {
        if (fade_out) {
            if (when) {
                sleep(Times.convert({ value: when, unit: TimeUnit.Second }, TimeUnit.Microsecond).value).then(() => {
                    AudioEffects.fade(this._gain.gain, { ...fade_out, targetValue: 0 })
                    this._source.stop()
                })
            } else {
                AudioEffects.fade(this._gain.gain, { ...fade_out, targetValue: 0 })
                this._source.stop()
            }
        } else {
            this._source.stop(when ? this._ctx.currentTime + when : undefined)
        }
    }
    /**
     * 在BufferSourceNode触发onended时触发
     *
     * @author KotoriK
     * @param {'ended'} type
     * @param {Function} listener
     * @memberof AudioSource
     */
    on(type: 'ended', listener: Function) {
        this._source.addEventListener('ended', listener())
    }
}

export interface SourceNodeLoopOptions {
    loop: boolean
    loopStart?: number
    loopEnd?: number
}

export interface StartOptions {
    fade?: FadeOption, loop?: SourceNodeLoopOptions, when?: number
}