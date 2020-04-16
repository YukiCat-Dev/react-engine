export default function num_between(a:number,b:number){
    let array:Array<number>=[],c=0
    if(b>a){
            c=a+1
    while(c<b){
         array.push(c)
         c++
    }
    }else if(b<a){
        c=b+1
        while(c<a){
             array.push(c)
             c++}
    }else{
        return undefined
    }
    
    return array.length==0?undefined:array
}