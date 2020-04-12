import { AbstractResource } from "./Resources"
import { BlobBasedHeavyResource } from "./BlobBasedHeavyResource";

/**
 * 表示一个文本集
 * @todo 注意文本集的名称不应该与任何文本重复（包括其他文本集的子文本）
 * @export
 * @class TextsetResource
 */
export default class TextsetResource extends BlobBasedHeavyResource{
    doDownGrade(): void {
        throw new Error("Method not implemented.");
    }
    /**
     *Creates an instance of TextsetResource.
     * @param {string} url 要访问的Url
     * @param {Map<string,AbstractResource>} textMap 载入后，将会把子文本载入这个Map
     * @memberof TextsetResource
     */
    constructor(url:string,textMap:Map<string,AbstractResource>){
        super({url})
        this.textMap=textMap
    }
    textMap:Map<string,AbstractResource>
    async preload() {
        throw new Error("Method not implemented.");
    }

}

export class TextResource extends AbstractResource{
   
    constructor(value:string){
        super({value})
      
    } /**
     * 不会做任何事。因为这类资源的预载是由 {TextsetResource} 完成的
     *
     * @memberof TextResource
     */
    preload() {
        //silently failed
    }

}