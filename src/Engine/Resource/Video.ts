import { BlobBasedHeavyResource } from "./BlobBasedHeavyResource"

/**
 * @description 视频资源
 * @author KotoriK
 * @date 2020-04-13
 * @export
 * @class Video
 * @extends {BlobBasedHeavyResource}
 */
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
    static downgrade: Blob

}