export default function iteratorToArray<T>(iterator:IterableIterator<T>){
    let array:Array<T>=[]
    for(const i of iterator){
        array.push(i)
    }
    return array
}