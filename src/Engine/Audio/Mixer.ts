import  {AudioSource ,SourceNodeLoopOptions } from "./AudioSource"

export default class Mixer {
    constructor(options?: MixerProps) {
        this.ctx = new AudioContext(options?.ctxOptions)
        this.mainGain = this.ctx.createGain()
        if(options?.defaultMainGainValue){
            this.mainGain.gain.setValueAtTime(options.defaultMainGainValue,this.ctx.currentTime)//初始化主增益节点音量
        }
        if (options?.dynamicCompressorOptions) {
            this.dynamicCompressor = this.ctx.createDynamicsCompressor()

            options.dynamicCompressorOptions.knee ?
                this.dynamicCompressor.knee
                    .setValueAtTime(options.dynamicCompressorOptions.knee, this.ctx.currentTime) : void

                //TODO:DynamicCompressor Options

                this.dynamicCompressor.connect(this.ctx.destination)
            this.mainGain.connect(this.dynamicCompressor)
        } else {
            this.dynamicCompressor = undefined
            this.mainGain.connect(this.ctx.destination)
        }
    }
    ctx: AudioContext
    /**
     * 主增益控制节点，总是连在ctx.destination或dynamicCompressor上（若有）
     *
     * @type {GainNode}
     * @memberof Mixer
     */
    readonly mainGain: GainNode
    /**
     * 动态压缩节点，用于解决爆音的问题
     * @todo TODO:尚需调教
     * @type {(DynamicsCompressorNode | undefined)}
     * @memberof Mixer
     */
    readonly dynamicCompressor: DynamicsCompressorNode | undefined
    /**
     * 索引srcId与对应的SourceNode的地图
     *
     * @private
     * @type {(Map<string, AudioSource>)}
     * @memberof Mixer
     */
    private _sourcesMap: Map<string, AudioSource> = new Map()
    /**
     * 保存需要加入到ctx的AudioNode，仅仅是帮助你管理这些资源而已。source会自动连接到Array中最后一个节点（按传入顺序）
     *
     * @type {Array<AudioNode>}
     * @memberof Mixer
     */
    audioNodes: Array<AudioNode> = []
    /**
     * 添加AudioNode到ctx中。建议把要加入的节点连接好后再放进去。原则上SourceNode请走addSource()添加
     *
     * @author KotoriK
     * @param {AudioNode} audioNode
     * @param {boolean} [autoConnect=false] 如果你选择自动连接的话，所有传入节点会自动连接到这个Mixer的gain上
     * @memberof Mixer
     */
    addProcessNode(audioNode: AudioNode, autoConnect: boolean = false) {
        if (autoConnect) {
            audioNode.connect(this.mainGain)
        }
        this.audioNodes.push(audioNode)
        return this
    }
    /**
     * 如果你想连接到最后一个节点的话，可以调用这个方法
     *
     * @author KotoriK
     * @param {AudioNode} node
     * @memberof Mixer
     */
    connectToLast(node: AudioNode | AudioSource) {
        let nodeLast:AudioNode
        if(this.audioNodes.length>0){
            nodeLast=this.audioNodes[this.audioNodes.length-1]
        }else{
            nodeLast= this.mainGain
        }
        node.connect(nodeLast)
        return nodeLast
    }
    /**
     * 根据所给的AudioBuffer创建一个AudioSource
     *
     * @author KotoriK
     * @param {string} id
     * @param {AudioBuffer} buf
     * @memberof Mixer
     */
    createSource(buf: AudioBuffer): AudioSource {
        return new AudioSource(buf,this.ctx)
    }
    hasSource(id: string) {
        return this._sourcesMap.has(id)
    }
    /**
     * 添加一个音源。
     *
     * @author KotoriK
     * @param {string} id
     * @param {AudioSource} node
     * @param {boolean} [autoConnect=false] 如果你选择自动连接的话，所有传入节点会自动连接到最后一个节点（调用connectToLast()）
     * @memberof Mixer
     */
    addSource(id: string, node: AudioSource,autoConnect:boolean=false) {
        if(autoConnect)this.connectToLast(node)
        this._sourcesMap.set(id, node)
        return this
    }
    /**
     * 删除指定的ArrayBuffer对应的AudioSource
     *
     * @author KotoriK
     * @param {AudioBuffer} buf
     * @returns {boolean} 是否删除成功
     * @memberof Mixer
     */
    removeSource(id: string): boolean {
        if (this._sourcesMap.has(id)) {
            this._sourcesMap.delete(id)
            return true
        } else {
            return false
        }
    }
    pauseAll() {
        this.ctx.suspend()
    }
    resumeAll() {
        this.ctx.resume()
    }
    /**
     *
     *
     * @author KotoriK
     * @param {string} id
     * @param {SourceNodeLoopOptions} [loop] 循环选项。不想循环就不要传参数
     * @param {number} [when]
     * @returns
     * @memberof Mixer
     */
    play(id: string, when?: number, loop?: SourceNodeLoopOptions) {
        let node = this._sourcesMap.get(id)
        if (node) {
            if(node.state=="stop")node.initSource()
            node.start({when,loop})
            return true
        } else {
            return false
        }
    }
    stop(id: string, when?: number) {
        let node = this._sourcesMap.get(id)
        if (node) {
            node.stop(when)
            return true
        } else {
            return false
        }
    }
    playAll(loop?: SourceNodeLoopOptions) {
        for (const node of this._sourcesMap.values()) {
            node.start({loop})

        }
        return this
    }
    stopAll() {
        for (const s of this._sourcesMap.values()) {
            s?.stop()
        }
        return this
    }
    getGainOf(id:string){
        return this._sourcesMap.get(id)?.gain
    }
}
export interface MixerProps {
    defaultMainGainValue?:number
    ctxOptions?: AudioContextOptions | undefined
    dynamicCompressorOptions?: DynamicsCompressorOptions | undefined
}
