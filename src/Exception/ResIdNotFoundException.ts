
/**
 * 当根据指定的ResId找不到资源时抛出
 *
 * @export
 * @class ResIdNotFoundException
 * @extends {Error}
 */
export default class ResIdNotFoundException extends Error{
    constructor(resId:string){ 
        //TODO:支持多语言
        let message=`Missing ResourceId:{${resId}},please check your game file`
        super(message)
        this.resId=resId
    }
    public resId:string
}