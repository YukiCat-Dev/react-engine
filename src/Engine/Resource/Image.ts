import { BlobBasedHeavyResource } from "./BlobBasedHeavyResource"

export default class Image extends BlobBasedHeavyResource {
    doDownGrade() {
        this.value = Image.downgrade 
    }
    /**
     *指出此类资源加载失败时，value的替代取值。
     * @author KotoriK
     * @static
     * @type {string}
     * @memberof Image
     */
    static downgrade: Blob
  
}