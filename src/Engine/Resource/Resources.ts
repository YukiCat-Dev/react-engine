import ResIdNotFoundException from "../Exception/ResIdNotFoundException"
import Image from "./Image"
import TextsetResource from "./TextsetResource"
import Music from "./Music"
import Video from "./Video"
/**
 * 管理游戏所需的多媒体资源
 *
 * @export
 * @class Resources
 */
export default class Resources {
    constructor() {
        let initArray: Array<[ResourceType, Map<string, AbstractResource>]> = []
        for (const type of Object.keys(ResourceType)) {
            initArray.push([ResourceType[type], new Map<string, AbstractResource>()])
        }
        this._mapSet = new Map(initArray)
    }
    public get(resType: ResourceType, resId: string) {
        let res = this._mapSet.get(resType).get(resId)
        if (res) {
            return res
        } else {
            throw new ResIdNotFoundException(resId)
        }
    }
    public initWithSetting(settings: Array<ResourceSetting>) {
        let abRes: AbstractResource | undefined = undefined
        for (const res of settings) {
            switch (res.resType) {
                case ResourceType.Image:
                    abRes = new Image({ url: res.url, mime: res.mime })
                    break
                case ResourceType.TextSet:
                    abRes = new TextsetResource({ url: res.url, textMap: this._mapSet.get(res.resType) })
                    break
                case ResourceType.Music:
                    abRes = new Music({ url: res.url, mime: res.mime })
                    break
                case ResourceType.Video:
                    abRes = new Video({ url: res.url, mime: res.mime })
                    break
                case ResourceType.ReactComponent:
                default:

            }
            if (abRes) {//TODO:DELETE
                this._mapSet.get(res.resType).set(res.id, abRes)
            }

        }
    }
    private _mapSet: Map<ResourceType, Map<string, AbstractResource>>
}

/**
 * 指定资源的类型。不同的资源类型决定他们如何被加载、使用
 *
 * @export
 * @enum {number}
 */
export enum ResourceType {
    empty = 0, Image = 1, TextSet = 2, Music = 3, Video = 4, ReactComponent = 5,
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
    inresType: number
    mime: string
}
export interface AbstractResourceConstructor {
    url?: string, value?: string, mime?: string
}
/**
 * 所有细分资源类型的基类。TODO：是否不需要知道资源的类型与id
 *
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
    }
    /**
     * 资源的值。对于文本而言，是他本身。对于HeavyResource而言，是blobUrl
     *
     * @type {string}
     * @memberof AbstractResource
     */

    value: string = ""

    /**
     * 资源的URL
     *
     * @type {string}
     * @memberof AbstractResource
     */
    url: string = ""

    /**
     * 开始预载资源。
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
    mime: string = ""

}




export class ReactComponent extends AbstractResource {
    preload() {
        throw new Error("Method not implemented.")
    }


}