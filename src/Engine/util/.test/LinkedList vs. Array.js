import LinkedList from "../LinkedList";

function test(times){
    var q=new LinkedList()
    var a=[]
//push
    console.time('queue push')
    for(let i=0;i<times;i++){
        q.push(i)
    }
    console.timeEnd('queue push')

    console.time('array push')
    for(let i=0;i<times;i++){
        a.push(i)
    }
    console.timeEnd('array push')
//shift
    console.time('queue shift')
    for(let i=0;i<times;i++){
        q.shift()
    }
    console.timeEnd('queue shift')

    console.time('array shift')
    for(let i=0;i<times;i++){
        a.shift()
    }
    console.timeEnd('array shift')
    //unshift
    console.time('queue unshift')
    for(let i=0;i<times;i++){
        q.unshift(i)
    }
    console.timeEnd('queue unshift')

    console.time('array unshift')
    for(let i=0;i<times;i++){
        a.unshift(i)
    }
    console.timeEnd('array unshift')
//delete
console.time('queue delete')
    for(let i=0;i<times;i++){
        q.delete(i)
    }
    console.timeEnd('queue delete')

    console.time('array splice')
    for(let i=0;i<times;i++){
        a.splice(i,1)
    }
    console.timeEnd('array splice')

}
