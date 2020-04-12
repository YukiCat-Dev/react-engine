import { AbstractResource } from "./Resources"
import ResourceLoader from "./ResLoader"

/**
 * 使用Blob API加载的资源
 *
 * @export
 * @abstract
 * @class BlobBasedHeavyResource
 * @implements {AbstractResource}
 */
export abstract class BlobBasedHeavyResource extends AbstractResource {
    
    async preload() {
        try {
            this.value=URL.createObjectURL(await ResourceLoader.getResourceByUrl(this.url))
            this.isLoaded=true
        } catch (e) {
            this.doDownGrade()
        }
    }

   
    /**
     * 执行降级。
     *
     * @memberof BlobBasedHeavyResource
     */
    abstract doDownGrade(): void
}


