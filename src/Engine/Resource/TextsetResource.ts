import { AbstractResource } from "./Resources"
import { BlobBasedHeavyResource } from "./BlobBasedHeavyResource";

/**
 * 表示一个文本集
 * @author KotoriK
 * @todo 注意文本集的名称不应该与任何文本重复（包括其他文本集的子文本）
 * @export
 * @class TextsetResource
 */
export default class TextsetResource extends BlobBasedHeavyResource {
    doDownGrade(): void {
        throw new Error("Method not implemented.");
    }
    /**
     *Creates an instance of TextsetResource.
     * @param {string} url 要访问的Url
     * @param {Map<string,AbstractResource>} textMap 载入后，将会把子文本载入这个Map
     * @memberof TextsetResource
     */
    constructor(url: string, textMap: Map<string, AbstractResource>) {
        super({ url })
        this.textMap = textMap
    }
    textMap: Map<string, AbstractResource>
     /**
     * 在BlobBased的资源中，要求value储存Blob对象本身，以控制对象释放.会自动更新对应的valueUrl。
     * 这个类不使用Url.
     * @type {(Blob|undefined)}
     * @memberof TextsetResource
     */
    protected _value: Blob | undefined
    public get value() {
        return this._value
    }
    public set value(newValue: Blob | undefined) {
        this._value = newValue

    }
    async preload() {
        await super.preload()
        if (this.value) {
           let resList:Array<TextsetResourceJSON>= JSON.parse(this.value instanceof Blob ? await this.value.text() : this.value)
           for(const i of resList){
               this.textMap.set(i.id,new TextResource(i.value))
           }

        } else {
            throw new Error()//TODO:EXCEPTION
        }

    }

}

export class TextResource extends AbstractResource {

    constructor(value: string) {
        super({ value })

    } /**
     * 不会做任何事。因为这类资源的预载是由 {TextsetResource} 完成的
     *
     * @memberof TextResource
     */
    preload() {
        //silently failed
    }

}

export interface TextsetResourceJSON{
    id:string
    value:string
}