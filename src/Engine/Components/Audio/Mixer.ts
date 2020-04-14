
export default class Mixer extends EventTarget {
    constructor(options?: MixerOptions) {
        super()
        this.ctx = new AudioContext(options?.ctxOptions)
        this.gain = this.ctx.createGain()
        if (options?.dynamicCompressorOptions) {
            this.dynamicCompressor = this.ctx.createDynamicsCompressor()

            options.dynamicCompressorOptions.knee ?
                this.dynamicCompressor.knee
                    .setValueAtTime(options.dynamicCompressorOptions.knee, this.ctx.currentTime) : void

                //TODO:DynamicCompressor Options

                this.dynamicCompressor.connect(this.ctx.destination)
            this.gain.connect(this.dynamicCompressor)
        } else {
            this.dynamicCompressor = undefined
            this.gain.connect(this.ctx.destination)
        }
    }
    //TODO:finish event system
    addEventListener(type: "play" | "pause", listener: EventListener | EventListenerObject | null, options?: boolean | AddEventListenerOptions | undefined): void {
        super.addEventListener(type, listener, options)
    }
    dispatchEvent(event: Event): boolean {
        return super.dispatchEvent(event)
    }
    removeEventListener(type: string, callback: EventListener | EventListenerObject | null, options?: boolean | EventListenerOptions | undefined): void {
        super.removeEventListener(type, callback, options)
    }
    ctx: AudioContext
    /**
     * 增益控制节点，总是连在ctx.destination或dynamicCompressor上（若有）
     *
     * @type {GainNode}
     * @memberof Mixer
     */
    readonly gain: GainNode
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
     * @type {(Map<string, AudioBufferSourceNode>)}
     * @memberof Mixer
     */
    private _sourcesMap: Map<string, AudioBufferSourceNode> = new Map()
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
            audioNode.connect(this.gain)
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
    connectToLast(node: AudioNode) {
        let nodeConnected:AudioNode
        if(this.audioNodes.length>0){
            nodeConnected=this.audioNodes[this.audioNodes.length-1]
        }else{
            nodeConnected= this.gain
        }
        node.connect(nodeConnected)
        return nodeConnected
    }
    /**
     * 根据所给的AudioBuffer创建一个AudioBufferSourceNode
     *
     * @author KotoriK
     * @param {string} id
     * @param {AudioBuffer} buf
     * @memberof Mixer
     */
    createSource(buf: AudioBuffer): AudioBufferSourceNode {
        let node = this.ctx.createBufferSource()
        node.buffer = buf
        return node
    }
    hasSource(id: string) {
        return this._sourcesMap.has(id)
    }
    /**
     * 添加一个音源。
     *
     * @author KotoriK
     * @param {string} id
     * @param {AudioBufferSourceNode} node
     * @param {boolean} [autoConnect=false] 如果你选择自动连接的话，所有传入节点会自动连接到最后一个节点（调用connectToLast()）
     * @memberof Mixer
     */
    addSource(id: string, node: AudioBufferSourceNode,autoConnect:boolean=false) {
        if(autoConnect)this.connectToLast(node)
        this._sourcesMap.set(id, node)
        node.addEventListener('ended', () => { this._sourcesMap.delete(id) }) //自毁，毕竟播完就没用了
        return this
    }
    /**
     * 删除指定的ArrayBuffer对应的AudioBufferSourceNode
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
            if (loop) {
                node.loop = true
                if (loop.loopStart) node.loopStart = loop.loopStart
                if (loop.loopEnd) node.loopEnd = loop.loopEnd
            }
                node.start(when)
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
            if (loop) {
                node.loop = true
                if (loop.loopStart) node.loopStart = loop.loopStart
                if (loop.loopEnd) node.loopEnd = loop.loopEnd
            }
            node.start()
        }
        return this
    }
    stopAll() {
        for (const s of this._sourcesMap.values()) {
            s?.stop()
        }
        return this
    }
    private _initPlayEvent(){
        this.dispatchEvent(new Event('play',{bubbles:true}))
    }

}
export interface MixerOptions {
    ctxOptions?: AudioContextOptions | undefined
    dynamicCompressorOptions?: DynamicsCompressorOptions | undefined
}
export interface SourceNodeLoopOptions {
    loop: boolean
    loopStart?: number
    loopEnd?: number
}