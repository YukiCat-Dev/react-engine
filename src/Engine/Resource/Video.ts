import { BlobBasedHeavyResource } from "./BlobBasedHeavyResource"

export default class Video extends BlobBasedHeavyResource {
    doDownGrade() {
        this.value = Video.downgrade
    }
    /**
     *指出此类资源加载失败时，value的替代取值。
     *
     * @static
     * @type {string}
     * @memberof Video
     */
    static downgrade: string

}