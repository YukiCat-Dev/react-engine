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
        let workMapInitArray: Array<[ResourceType, Worker]> = []
        for (const type of options.decodeWorker) {
            workMapInitArray.push([ResourceType[type[0]], new Worker(type[1])])//TODO:importer
        }

        this._workers = new Map(workMapInitArray)
    }
    /**
     * 得到resId对应的资源。注意resId应唯一且不能重名。
     *
     * @author KotoriK
     * @param {string} resId
     * @returns
     * @memberof Resources
     */
    public get(resId: string) {
        let res = this._mapSet.get(resId)
        if (res) {
            return res
        } else {
            throw new ResIdNotFoundException(resId)
        }
    }
    public getText(resId: string) {
        return this.get(`TS_${resId}`)
    }
    public init(settings: Array<ResourceSetting>) {
        let abRes: AbstractResource | undefined = undefined
        for (const res of settings) {
            switch (res.resType) {
                case ResourceType.IMAGE:
                    abRes = new Image({ id: res.id, url: res.url, mime: res.mime })
                    break
                case ResourceType.TEXT_SET:
                    abRes = new TextsetResource({ id: res.id, url: res.url }, this._mapSet)
                    break
                case ResourceType.TEXT:
                    abRes = new TextResource({ id: res.id, value: res.value ? res.value : '' })
                    break
                case ResourceType.AUDIO:
                    abRes = new Audio({ id: res.id, url: res.url, mime: res.mime, worker: this._workers.get(res.resType), })
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
            if (abRes) {
                this._mapSet.set(res.id, abRes)
            }

        }
    }
    public remove(resId: string) {
        return this._mapSet.delete(resId)
    }
    private _mapSet: Map<string, AbstractResource> = new Map()
    private _workers: Map<ResourceType, Worker>
}

/**
 * 指定资源的类型。不同的资源类型决定他们如何被加载、使用
 *
 * @export
 * @enum {number}
 */
export enum ResourceType {
    EMPTY, IMAGE, TEXT_SET, TEXT, AUDIO, VIDEO, REACT_COMPONENT, SCRIPT
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
    /**
     * 仅Text类型直接带value
     *
     * @type {string}
     * @memberof ResourceSetting
     */
    value?: string

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
    unload() {
        this.value = undefined
        this.isLoaded = false
    }
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

export type MarkedAbstractResource=[boolean,AbstractResource]