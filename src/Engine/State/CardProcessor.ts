import { SceneAction, SceneActionType } from "./SceneAction";
import SceneBootstrap from "./SceneBootstrap";
import { Time } from "../util/time";
import Card, { ProcessedCard } from "./Card";

export default class CardProcessor{
    constructor(card:Card,bootstrap:SceneBootstrap){
        this.card=card
        this._bootstrap=bootstrap
    }
    public card:Card
    private _bootstrap:SceneBootstrap
    private _nowCardAction: Array<SceneAction> = []
    jumpNext() {
        this._nowCardAction.push({ type: SceneActionType.jump_to, value: 'next' })
        return this
    }
    jumpToEnd() {
        this._nowCardAction.push({ type: SceneActionType.jump_to, value: 'end' })
        return this
    }
    jumpToStart() {
        this._nowCardAction.push({ type: SceneActionType.jump_to, value: 0 })
        return this
    }
    jumpTo(index:number) {
        this._nowCardAction.push({ type: SceneActionType.jump_to, value: index })
        return this
    }
    playAudio(resId: string,onTrack:string) {
        this._prepareResource(resId)
        this._nowCardAction.push({type:SceneActionType.au_play_source,track:onTrack,resId:resId})
        return this
    }
   
    setBackground(resId: string) {

    }
    private _prepareResource(resId:string){
        this._bootstrap.res.set(resId,[false,this._bootstrap.engine.ResourcesSet.get(resId)])
    }
    showComponent() {

    }

    wait(time:Time){
        this._nowCardAction.push({ type: SceneActionType._wait, value:time })
        return this
    }
    setInterval(){

    }
    /**
     * 引擎内部函数，不应在Card里被调用。
     *
     * @author KotoriK
     * @returns
     * @memberof CardProcessor
     */
    _build(){
        this.card.run(this)

        return { actions: this._nowCardAction } as ProcessedCard
    }
}