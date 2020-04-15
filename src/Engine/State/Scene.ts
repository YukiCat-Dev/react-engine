import Card from "./Card";
import { AbstractResource } from "../Resource/Resources";

/**
 * 
 *
 * @export
 * @class Scene
 */
export default class Scene{
    private _cards:Array<Card>=[]
    private _res:Map<string,AbstractResource>
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

