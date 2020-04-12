import { BlobBasedHeavyResource } from "./BlobBasedHeavyResource"

export default class Music extends BlobBasedHeavyResource {
    doDownGrade() {
        this.value = Music.downgrade
    }
    /**
     *指出此类资源加载失败时，value的替代取值。
     *
     * @static
     * @type {string}
     * @memberof Music
     */
    static downgrade: string

}