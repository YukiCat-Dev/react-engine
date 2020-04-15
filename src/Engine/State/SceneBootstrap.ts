import Card from "./Card";
import Scene from "./Scene";
import SceneAction from "./SceneAction";

/**
 * 自定义场景的启动模板
 *
 * @author KotoriK
 * @export
 * @class SceneBootstrap
 */
export default class SceneBootstrap extends Scene{
    private _cards:Array<Card>=[]
    private _cardAction:Array<SceneAction>=[]
    addCard(card:Card){
        this._cards.push(card)
        return this
    }
    jumpNext(){

    }
    jumpToEnd(){

    }
    jumpToStart(){

    }
    jumpTo(card:Card){

    }
    playBGS(resId:string){

    }
    playBGM(resId:string){

    }
    playCV(resId:string){

    }
    setBackground(resId:string){

    }
    showComponent(){

    }
    
}
export enum GainChangeType{
    linear,exp,directly
}