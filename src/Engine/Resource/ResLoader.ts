const regHTTPURL = /^https?/i
const RETRY_TIME = 5
const retryAfterMs = 1000
import sleep from '../util/sleep'

/**
 * @description 资源加载支持。
 * @author KotoriK
 * @date 2020-04-13
 * @export
 * @class ResourceLoader
 */
export default class ResourceLoader {
    /**
     * 根据所给的URL（网络资源或本地资源）获取资源并返回。
     *
     * @static
     * @param {string} url 资源的URL
     * @param {number} [retryTime] 重试次数，默认为 RETRY_TIME
     * @returns {Promise<Blob>}
     * @memberof Path
     */
    static getResourceByUrl(url: string, retryTime?: number): Promise<Blob> {
        const retry = async () => {//TODO:performance?
            //重试
            await sleep(retryAfterMs)
            retryTime = retryTime ? retryTime : RETRY_TIME
            if (retryTime > 0) {
                return ResourceLoader.getResourceByUrl(url, retryTime - 1)
            }
            else {
                //TODO:这么抠门真的可以吗
                let URLCantResolveException = await import('../Exception/URLCantResolveException')
                throw new URLCantResolveException.default(url)
            }
        }
        //判断是本地还是HTTP资源
        if (regHTTPURL.test(url)) {
            return fetch(url, {
                method: "GET",
                body: "blob"
            }).then((response) => {
                if (response.ok) {
                    return response.blob()
                } else {
                    return retry()
                }
            }, retry)

        } else {
            let fileReader = new FileReader(), blob: Blob
            return new Promise<Blob>((resolve, reject) => {
                fileReader.onloadend = () => {
                    resolve(blob)
                }
                fileReader.onabort = () => { reject('abort') }
                fileReader.onerror = () => { reject('error') }
                fileReader.readAsDataURL(blob)
            }).then((value) => { return value }, retry)
        }
    }
}