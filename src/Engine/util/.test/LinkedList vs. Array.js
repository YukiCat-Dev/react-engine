import SingleWayLinkedList from "../SingleWayLinkedList";
import CircularLinkedList from '../CircularLinkedList'
function test(times){
    var q=new SingleWayLinkedList()
    var a=[]
    var c=new CircularLinkedList()

//push
    console.time('single-link push')
    for(let i=0;i<times;i++){
        q.push(i)
    }
    console.timeEnd('single-link push')

    console.time('circular push')
    for(let i=0;i<times;i++){
        c.push(i)
    }
    console.timeEnd('circular push')

    console.time('array push')
    for(let i=0;i<times;i++){
        a.push(i)
    }
    console.timeEnd('array push')
//shift
    console.time('single-link shift')
    for(let i=0;i<times;i++){
        q.shift()
    }
    console.timeEnd('single-link shift')

    console.time('circular shift')
    for(let i=0;i<times;i++){
        c.shift()
    }
    console.timeEnd('circular shift')

    console.time('array shift')
    for(let i=0;i<times;i++){
        a.shift()
    }
    console.timeEnd('array shift')
    //unshift
    console.time('single-link unshift')
    for(let i=0;i<times;i++){
        q.unshift(i)
    }
    console.timeEnd('single-link unshift')

    console.time('circular unshift')
    for(let i=0;i<times;i++){
        c.unshift(i)
    }
    console.timeEnd('circular unshift')

    console.time('array unshift')
    for(let i=0;i<times;i++){
        a.unshift(i)
    }
    console.timeEnd('array unshift')
//delete
console.time('single-link delete')
    for(let i=0;i<times;i++){
        q.remove(i)
    }
    console.timeEnd('single-link delete')

  /*   console.time('single-link delete')
    for(let i=0;i<times;i++){
        c.delete(i)
    }
    console.timeEnd('single-link delete') */

    console.time('array splice')
    for(let i=0;i<times;i++){
        a.splice(i,1)
    }
    console.timeEnd('array splice')

}
