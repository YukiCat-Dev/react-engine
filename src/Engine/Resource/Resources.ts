import ResIdNotFoundException from "../Exception/ResIdNotFoundException"
import Image from "./Image"
import TextsetResource, { TextResource } from "./TextsetResource"
import Audio from "./Audio"
import Video from "./Video"
/**
 * 管理游戏所需的多媒体资源
 * @author KotoriK
 * @export
 * @class Resources
 */
export default class Resources {
    constructor(options: ResourcesOptions) {
        let initArray: Array<[ResourceType, Map<string, AbstractResource>]> = []
        let workMapInitArray: Array<[ResourceType, Worker]> =[]
        for(const type of options.decodeWorker){
            workMapInitArray.push([ResourceType[type[0]],new Worker(type[1])])//TODO:importer
        }
        for (const type of Object.keys(ResourceType)) {
            initArray.push([ResourceType[type], new Map<string, AbstractResource>()])
        }

        this._mapSet = new Map(initArray)
        this._workers=new Map(workMapInitArray)
    }
    public get(resType: ResourceType, resId: string) {
        let res = this._mapSet.get(resType)?.get(resId)
        if (res) {
            return res
        } else {
            throw new ResIdNotFoundException(resId)
        }
    }
    public init(settings: Array<ResourceSetting>) {
        let abRes: AbstractResource | undefined = undefined
        for (const res of settings) {
            switch (res.resType) {
                case ResourceType.IMAGE:
                    abRes = new Image({ id: res.id, url: res.url, mime: res.mime })
                    break
                case ResourceType.TEXT_SET:
                    let map=this._mapSet.get(res.resType)
                    if(!map)throw new Error()//TODO:UnknownException
                    abRes = new TextsetResource(res.url, map)
                    break
                case ResourceType.TEXT:
                    abRes = new TextResource(res.url)//TODO:
                    break
                case ResourceType.MUSIC:
                    abRes = new Audio({ id: res.id, url: res.url, mime: res.mime,worker:this._workers.get(res.resType), })
                    break
                case ResourceType.VIDEO:
                    abRes = new Video({ id: res.id, url: res.url, mime: res.mime })
                    break
                case ResourceType.REACT_COMPONENT:
                    break
                case ResourceType.SCRIPT:
                    break
                default:

            }
            if (abRes) {//TODO:DELETE
                this._mapSet.get(res.resType)?.set(res.id, abRes)
            }

        }
    }
    private _mapSet: Map<ResourceType, Map<string, AbstractResource>>
    private _workers: Map<ResourceType, Worker>
}

/**
 * 指定资源的类型。不同的资源类型决定他们如何被加载、使用
 *
 * @export
 * @enum {number}
 */
export enum ResourceType {
    EMPTY, IMAGE, TEXT_SET, TEXT, MUSIC, VIDEO, REACT_COMPONENT, SCRIPT
}
/**
 * 指定资源的Json储存形式
 *
 * @export
 * @interface ResourceSetting
 */
export interface ResourceSetting {
    id: string
    url: string
    resType: number
    mime?: string

}
export interface AbstractResourceConstructor {
    id: string, url?: string, value?: string, mime?: string,
    worker?: Worker
}
/**
 * 所有细分资源类型的基类。
 * @author KotoriK
 * @export
 * @abstract
 * @class AbstractResource
 */
export abstract class AbstractResource {

    constructor(args: AbstractResourceConstructor) {
        if (args.url) {
            this.url = args.url
            this.isLoaded = false
        } else if (args.value) {
            this.value = args.value
            this.isLoaded = true
        }
        this.mime = args.mime
        this.worker = args.worker
    }
    /**
     * resId
     *
     * @type {string}
     * @memberof AbstractResource
     */
    id: string = ""
    /**
     * 资源的值。对于文本而言，是他本身。对于HeavyResource而言，是blob对象本身
     *
     * @type {(string | Blob)}
     * @memberof AbstractResource
     */

    value: string | Blob | undefined | Object

    /**
     * 资源的URL
     *
     * @type {string}
     * @memberof AbstractResource
     */
    url: string = ""

    /**
     * 将资源预载至内存。
     *
     * @memberof AbstractResource
     */
    abstract preload()
    /**
     *
     * 指示是否已经加载。
     * @type {boolean}
     * @memberof AbstractResource
     */
    isLoaded: boolean = false

    /**
     * 资源的MIME类型。对于不需要此项的资源可以为空
     *
     * @type {string}
     * @memberof AbstractResource
     */
    mime?: string = ""

    /**
     * 指示执行进一步解码工作的Worker
     *
     * @type {Worker}
     * @memberof AbstractResource
     */
    worker?: Worker

}

export interface ResourcesOptions {
    decodeWorker: Array<[string, string]>//    "decodeWorker":[["audio","../src/Engine/Components/Audio/AudioDecodeWorker.ts"]]
}


export class ReactComponent extends AbstractResource {
    preload() {
        throw new Error("Method not implemented.")
    }
}