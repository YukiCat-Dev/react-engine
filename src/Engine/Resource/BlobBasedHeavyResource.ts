import { AbstractResource } from "./Resources"
import ResourceLoader from "./ResLoader"

/**
 * 使用Blob API加载的资源
 * @author KotoriK
 * @export
 * @abstract
 * @class BlobBasedHeavyResource
 * @implements {AbstractResource}
 */
export abstract class BlobBasedHeavyResource extends AbstractResource {

    async preload() {
        try {
            this.value = await ResourceLoader.getResourceByUrl(this.url)
            this.isLoaded = true
        } catch (e) {
            this.doDownGrade()
        }
    }
    /**
     * 在BlobBased的资源中，value可以储存Blob对象本身，也可以转换成准备呈现的状态
     *
     * @type {(Blob|undefined|Object)}
     * @memberof BlobBasedHeavyResource
     */
    protected _value: Blob | undefined | Object
    public get value() {
        return this._value
    }
    /**@todo 不需要自动创建valueUrl时应当重写setter */
    public set value(newValue: Blob | undefined | Object) {
        if (this._valueUrl) {
            URL.revokeObjectURL(this._valueUrl)
        }
        this._value = newValue
        //仅在_value存在时，创建新的ObjectURL
        if (this._value) this._valueUrl = URL.createObjectURL(this._value)

    }
    /**
     *  指向value的blob对象的url。只读，必要时内部自动生成。
     *
     * @type {string}
     * @memberof BlobBasedHeavyResource
     */
    private _valueUrl: string = ''
    public get valueUrl() {
        return this._valueUrl
    }

    async unload() {
        this.value = undefined//其他工作在setter中完成
    }
    /**
     * 执行降级。
     *
     * @memberof BlobBasedHeavyResource
     */
    abstract doDownGrade(): void
}


