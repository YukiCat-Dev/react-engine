import {SceneAction} from "./SceneAction";
import CardProcessor from "./CardProcessor";

export default abstract class Card {
    constructor(run:(Scene:CardProcessor)=>void){
      this.run=run
    }
 run:(Scene:CardProcessor)=>void

}
export interface ProcessedCard{
    actions:Array<SceneAction>
}