export default class ResIdNotFoundException extends Error{
    constructor(resId:string){ 
        //TODO:支持多语言
        let message=`Missing ResourceId:{${resId}},please check your game file`
        super(message)
        this.resId=resId
    }
    public resId:string
}