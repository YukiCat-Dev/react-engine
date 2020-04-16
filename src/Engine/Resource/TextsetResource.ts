import { AbstractResource, AbstractResourceConstructor } from "./Resources"
import { BlobBasedHeavyResource } from "./BlobBasedHeavyResource";

/**
 * 表示一个文本集
 * @author KotoriK
 * @todo 注意文本集的名称不应该与任何文本重复（包括其他文本集的子文本） Textset中包含的文本在加入mapset时，id前会自动添加 TS_
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
    constructor(options: AbstractResourceConstructor, textMap: Map<string, AbstractResource>, doUnload: boolean = false) {
        super(options)
        this.textMap = textMap
        if (doUnload) {

        } else {
            this.init()
        }
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
    async unloadChild(){
        await super.preload()
        if (this.value) {
            let resList: Array<TextResourceConstructor> = JSON.parse(this.value instanceof Blob ? await this.value.text() : this.value)
            for (const i of resList) {
                this.textMap.delete(i.id)//TODO:可能成为一个漏洞
            }}
    }
    async init() {
        await super.preload()
        if (this.value) {
            let resList: Array<TextResourceConstructor> = JSON.parse(this.value instanceof Blob ? await this.value.text() : this.value)
            for (const i of resList) {
                this.textMap.set(`TS_${i.id}`, new TextResource({ id: `TS_${i.id}`, value: i.value }))
            }
            this._value = undefined//加载完后清除blob
            this.textMap.delete(this.id)//然后清除自己
        } else {
            throw new Error()//TODO:EXCEPTION
        }

    }
    async preload() {
        //silently failed
    }


}

export class TextResource extends AbstractResource {

    constructor(options: TextResourceConstructor) {
        super(options)

    } /**
     * 不会做任何事。因为这类资源的预载是由 {TextsetResource} 完成的
     *
     * @memberof TextResource
     */
    preload() {
        //silently failed
    }
    unload() {
        //silently failed
    }

}

export interface TextResourceConstructor {
    id: string
    value: string
}