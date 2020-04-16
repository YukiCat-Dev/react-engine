export default class CircularLinkedList<T>{
    constructor(array?: Array<T>) {
        if (array) {
            for (const i of array) {
                this.push(i)
            }
        }

    }
    private _entry?: DualLinkedNode<T>
    private _length: number = 0
    push(value: T) {
        let node: DualLinkedNode<T> = new DualLinkedNode(value)
        if (this._entry) {
            node.next = this._entry.next
            node.prev = this._entry
            this._entry.next.prev = node
            this._entry.next = node
        }
        this._entry = node
        this._length++
        return this
    }
    pop() {
        let node = this._entry
        if (node) {
            if (node.prev === node) {
                this._entry = undefined
            } else {
                node.prev.next = node.next
                node.next.prev = node.prev
                this._entry = node.prev
            }
            this._length--
        }
        return node?.value
    }
    shift() {
        if (this._entry) {
            let node = this._entry.next
            if (node.prev === node) {
                this._entry = undefined
            } else {
                node.prev.next = node.next
                node.next.prev = node.prev

            }
            this._length--
            return node.value
        } else {
            return undefined
        }
    }
    unshift(value: T) {
        let node = new DualLinkedNode(value)
        if (this._entry) {
            node.prev = this._entry
            node.next = this._entry.next
            this._entry.next.prev = node
            this._entry.next = node

        } else {
            this._entry = node
        }
        this._length++
        return this
    }
    toArray() {
        let entry = this._entry, array: Array<T> = []
        if (entry) {
            let now = entry.next
            do {
                array.push(now.value)
                now = now.next
            } while (now !== entry.next)
        }
        return array
    }
    toString() {
        return this.toArray().join('<=>')
    }
   /*  private async _binarySearch(value: T): Promise<DualLinkedNode<T> | undefined> {
        if (this._entry) {
            let entry = this._entry
           return await Promise.race([async () => {
                let now = entry
                do {
                    if (now.value == value) return now
                    now = now.next
                } while (now !== entry)
                return undefined
            },async () => {
                let now = entry
                do {
                    if (now.value == value) return now
                    now = now.prev
                } while (now !== entry)
                return undefined
            }])
        } else {
            return undefined
        }
    }
    deleteBS(value: T) {
        if (this._entry) {
            Promise.race([async () => {
                let entry = this._entry, now = this._entry.next
                do {

                } while (now !== entry.next)
            }])
        } else {
            return false
        }

    }
 */
}
export class DualLinkedNode<T> {
    constructor(value: T, prev?: DualLinkedNode<T>, next?: DualLinkedNode<T>) {
        this.value = value
        this.prev = prev ? prev : this
        this.next = next ? next : this
    }
    value: T
    prev: DualLinkedNode<T>
    next: DualLinkedNode<T>
}