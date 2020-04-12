import ResIdNotFoundException from "../Exception/ResIdNotFoundException"

/**
 * 管理游戏所需的多媒体资源
 *
 * @export
 * @class Resources
 */
export default class Resources{
    constructor(){
        let initArray=[]
        for(const type of Object.keys(ResourceType)){
            initArray.push([type,new Map<string,AbstractResource>()])
        }
        this._mapSet=new Map(initArray)
    }
    public get(resType:ResourceType,resId:string){
        let res= this._mapSet.get(resType).get(resId)
        if(res){
            return res
        }else{
            throw new ResIdNotFoundException(resId)
        }
    }
    public initWithSetting(settings:Array<ResourceSetting>){
        for(const res of settings){
            this._mapSet.get(res.resType).set(res.id,{url:res.url}) 
        }
    }
   private _mapSet:Map<ResourceType,Map<string,AbstractResource>>
}

/**
 * 指定资源的类型。不同的资源类型决定他们如何被加载、使用
 *
 * @export
 * @enum {number}
 */
export enum ResourceType{
    empty=0,Image=1,Text=2,Music=3,ReactComponent=4,
}
/**
 * 指定资源的Json储存形式
 *
 * @export
 * @interface ResourceSetting
 */
export interface ResourceSetting{
    id:string
    url:string
    resType:number
    inresType:number
}

/**
 * 所有细分资源类型的基类。TODO：是否不需要知道资源的类型与id
 *
 * @export
 * @interface AbstractResource
 */
export interface AbstractResource{
    url:string,
    
}