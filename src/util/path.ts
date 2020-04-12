/** 资源加载支持。*/
const regHTTPURL=/^https?/i
const RETRY_TIME=5
const retryAfterMs=1000
import sleep from './sleep'


export default class Path{
    /**
     * 根据所给的URL（网络资源或本地资源）获取资源并返回。
     *
     * @static
     * @param {string} url 资源的URL
     * @param {number} [retryTime] 重试次数，默认为 RETRY_TIME
     * @returns
     * @memberof Path
     */
    static getResourceByUrl(url:string,retryTime?:number){
        //判断是本地还是HTTP资源
        if(regHTTPURL.test(url)){
            return fetch(url,{
                method:"GET",
                body:"blob"
            }).then((response)=>{
                if(response.ok){
                    return response.blob()
                }else{
                    return sleep(retryAfterMs).then(async ()=>{
                        retryTime=retryTime?retryTime:RETRY_TIME
                        if(retryTime>0){
                            return this.getResourceByUrl(url,retryTime-1)
                        }else{
                            //TODO:这么抠门真的可以吗
                            let URLCantResolveException=await import('../Exception/URLCantResolveException')
                            throw new URLCantResolveException.default(url)
                        }
                        
                    })
                }
                
            },(rejectReason)=>{

            })
        }else{

        }
    }
}