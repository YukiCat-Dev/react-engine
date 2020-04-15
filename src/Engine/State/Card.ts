import Scene from "./Scene";
import SceneAction from "./SceneAction";

export default abstract class Card {
    constructor(scene:Scene){
        this.scene=scene
    }
    public scene:Scene
    abstract run()

}
export class ProcessedCard{
    actions:Array<SceneAction>
    a:Queue
}