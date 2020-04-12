
/**
 * 当根据指定的URL无法获取到资源时抛出。此Exception意味着已经耗尽了所有重试次数。
 *
 * @export
 * @class ResIdNotFoundException
 * @extends {Error}
 */
export default class ResIdNotFoundException extends Error{
    constructor(url:string,reason?:string){ 
        //TODO:支持多语言
        let message=`Can't resolve {${url}},${reason?`failed with reason "${reason}",`:``}please check your game file or network connection.`
        super(message)
        this.url=url
    }
    public url:string
    public reason:string
}