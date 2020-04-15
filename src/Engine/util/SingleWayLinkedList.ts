export default class SingleWayLinkedList<T>{
    constructor(array?:Array<T>){
        if(array && array.length>0){
            for(const i of array){
                this.push(i)
            }
        }
    }
    private _length: number = 0
    /**
     * 返回链表长度
     *
     * @readonly
     * @type {number}
     * @memberof SingleWayLinkedList
     */
    public get length(): number {
        return this._length;
    }
    private _firstNode: LinkedListNode<T> | undefined
    private _lastNode: LinkedListNode<T> | undefined

    /**
     *
     * 于尾部添加元素
     * @author KotoriK
     * @param {T} nodeValue
     * @memberof SingleWayLinkedList
     */
    public push(nodeValue: T) {
        let node: LinkedListNode<T> = { value: nodeValue }
        if (this._lastNode) {
            this._lastNode.next = node
            this._lastNode = node
        } else {
            this._lastNode = node
            this._firstNode = node
        }
        this._length++
    }
    /**
     * 弹出头部的元素
     *
     * @author KotoriK
     * @returns
     * @memberof SingleWayLinkedList
     */
    public shift() {
        let node = this._firstNode
        if (node) { 
            this._firstNode = node.next
            if(node==this._lastNode){this._lastNode=undefined}
             this._length-- }
        return node?.value
    }
    /**
     * 在头部加入元素
     *
     * @author KotoriK
     * @param {T} nodeValue
     * @memberof SingleWayLinkedList
     */
    public unshift(nodeValue: T) {
        let node = { value: nodeValue, next: this._firstNode ? this._firstNode : undefined }
        this._firstNode = node
        if (!this._lastNode) this._lastNode = node
        this._length++
    }
    /**
     * 预览头部元素
     *
     * @author KotoriK
     * @returns
     * @memberof SingleWayLinkedList
     */
    public peek() {
        return this._firstNode?.value
    }
    /**
     * 预览尾部元素
     *
     * @author KotoriK
     * @returns
     * @memberof SingleWayLinkedList
     */
    public last(){
        return this._lastNode?.value
    }
    /**
     * 移去第一个相符元素
     *
     * @author KotoriK
     * @param {T} nodeValue 要移去的元素
     * @returns
     * @memberof SingleWayLinkedList
     */
    public remove(nodeValue: T) {//TODO:优化
        let node = this._firstNode, former: undefined | LinkedListNode<T>
        if (node) {
            if (node.value == nodeValue) {
                this._firstNode = node.next
                if(node==this._lastNode){this._lastNode=undefined}
                 this._length--//shift
                return true
            }
            former = node
            node = node.next
            while (node) {
                if (node.value == nodeValue) {
                    former.next = node.next
                    if (!node.next) {
                        this._lastNode=former
                    }
                    this._length--
                    return true
                }
                former = node
                node = node.next
            }
        }
        return false
    }
    public toArray(): Array<T> {
        let array: Array<T> = []
        let node = this._firstNode
        while (node) {
            array.push(node.value)
            node = node.next
        }
        return array
    }
    public findIndex(nodeValue: T) {
        let node = this._firstNode, array: Array<number> = [], count = 0
        while (node) {
            if (node.value == nodeValue) array.push(count)
            node = node.next
            count++
        }
        return array
    }
    public findFirst(nodeValue: T) {
        let node = this._firstNode, count = 0
        while (node) {
            if (node.value == nodeValue) return count
            node = node.next
            count++
        }
        return -1
    }



}
export interface LinkedListNode<T> {
    value: T
    next?: LinkedListNode<T>
}