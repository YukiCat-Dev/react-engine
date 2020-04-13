import Scene from "./Scene";

export default abstract class Card {
    constructor(scene:Scene){
        this.scene=scene
    }
    public scene:Scene
    abstract run()

}
