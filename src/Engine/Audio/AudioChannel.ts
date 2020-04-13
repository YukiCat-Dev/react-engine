import Audio from "../Resource/Audio"
import AudioPlayer from "./AudioPlayer"

export default class AudioChannel {
    constructor(maxPlaying: number,latencyHint?:AudioContextLatencyCategory | number) {
        this.maxPlaying = maxPlaying
        this._latencyHint=latencyHint
    }
    /**
     * 只读。指示这个频道可以同时有多少个音乐在播放
     *
     * @type {number}
     * @memberof MusicPlayer
     */
    readonly maxPlaying: number
    private _playing: Array<AudioPlayer> = []
    private _loaded: Array<AudioPlayer> = []
    private _empty: Array<AudioPlayer> = []
    private _latencyHint?:AudioContextLatencyCategory | number
    private _applyEmptyPlayer(): AudioPlayer {
        let player = this._empty.shift()
        return (player ? player : this._initNewEle())
    }
    private _initNewEle() {
        return new AudioPlayer({latencyHint:this._latencyHint})
    }
    preload(resMusic: Audio) {
        if (resMusic.value) {
            let player = this._applyEmptyPlayer()
            player.load(resMusic.value)
            this._loaded.push(player)
            return player
        }
        
    }
    play(player: HTMLAudioElement) {
        ele.play()
    }
}