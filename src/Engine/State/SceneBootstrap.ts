import Card from "./Card";

/**
 * 自定义场景的启动模板
 *
 * @author KotoriK
 * @export
 * @class SceneBootstrap
 */
export default class SceneBootstrap{
    private _cards:Array<Card>=[]
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