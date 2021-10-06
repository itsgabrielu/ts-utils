export class SinglyLinkedNode<V> {
  private _id: Symbol;
  private _next: SinglyLinkedNode<V> | undefined;
  value: V;
  constructor(list: V[]) {
    this._id = Symbol();
    this.value = list[0];
    const nextList = [...list];
    nextList.shift();
    this._next =
      nextList.length > 0 ? new SinglyLinkedNode(nextList) : undefined;
  }
  get id() {
    return this._id;
  }
  get length() {
    let currentNode = this as SinglyLinkedNode<V>;
    let currentLength = 0;
    while (typeof currentNode !== "undefined") {
      const nextNode = currentNode;
      currentNode = nextNode;
      currentLength += 1;
    }
    return currentLength;
  }
  get next() {
    return this._next;
  }
  // Access time of O(n) where n is the length of the linked list
  appendToTail(endVal: V) {
    const tailNode = new SinglyLinkedNode<V>([endVal]);
    let currentNode = this as SinglyLinkedNode<V>;
    while (typeof currentNode._next !== "undefined") {
      const nextNode = currentNode._next;
      currentNode = nextNode;
    }
    currentNode._next = tailNode;
  }
  removeNode(predicate: (singlyLinkedNode: SinglyLinkedNode<V>) => boolean) {
    let currentNode = this as SinglyLinkedNode<V> | undefined;
    let prevNode = undefined as SinglyLinkedNode<V> | undefined;
    while (typeof currentNode !== "undefined") {
      const matched = predicate(currentNode);
      const nextNode = currentNode._next;
      if (typeof matched === "boolean" && matched) {
        if (typeof prevNode !== "undefined") {
          // Node will be removed
          prevNode._next = nextNode;
        }
      }
      prevNode = currentNode;
      currentNode = nextNode;
    }
  }
  /**
   * For testing
   */
  map<M = any>(forEachNode: (singlyLinkedNode: SinglyLinkedNode<V>) => M): M[] {
    let currentNode = this as SinglyLinkedNode<V> | undefined;
    const list = [];
    while (typeof currentNode !== "undefined") {
      list.push(forEachNode(currentNode));
      const nextNode = currentNode._next;
      currentNode = nextNode;
    }
    return list;
  }
}

export class DoublyLinkedNode<V> {
  private _id: Symbol;
  private _prev: DoublyLinkedNode<V> | undefined;
  private _next: DoublyLinkedNode<V> | undefined;
  value: V;

  constructor(list: V[]) {
    this._id = Symbol();
    this.value = list[0];
    const nextList = [...list];
    nextList.shift();
    this._prev = undefined;
    this._next =
      nextList.length > 0 ? new DoublyLinkedNode(nextList) : undefined;
  }
  get id() {
    return this._id;
  }
  get length() {
    let currentNode = this as DoublyLinkedNode<V>;
    let currentLength = 0;
    while (typeof currentNode !== "undefined") {
      const nextNode = currentNode;
      currentNode = nextNode;
      currentLength += 1;
    }
    return currentLength;
  }
  get next() {
    return this._next;
  }
  // Access time of O(n) where n is the length of the linked list
  appendToTail(endVal: V) {
    const tailNode = new DoublyLinkedNode<V>([endVal]);
    let currentNode = this as DoublyLinkedNode<V>;
    while (typeof currentNode._next !== "undefined") {
      const nextNode = currentNode._next;
      currentNode = nextNode;
    }
    currentNode._next = tailNode;
  }
  removeNode(predicate: (doublyLinkedNode: DoublyLinkedNode<V>) => boolean) {
    let currentNode = this as DoublyLinkedNode<V> | undefined;
    let prevNode = currentNode?._prev as DoublyLinkedNode<V> | undefined;
    while (typeof currentNode !== "undefined") {
      const matched = predicate(currentNode);
      const nextNode = currentNode._next;
      if (typeof matched === "boolean" && matched) {
        if (typeof nextNode !== "undefined") {
          // Next node's link to previous node moved to prev node instead of
          // current node
          nextNode._prev = prevNode;
        }
        if (typeof prevNode !== "undefined") {
          // Prev node's link to next node moved to next node instead of
          // current node
          prevNode._next = nextNode;
        }
      }
      prevNode = currentNode;
      currentNode = nextNode;
    }
  }
  /**
   * For testing
   */
  map<M = any>(forEachNode: (doublyLinkedNode: DoublyLinkedNode<V>) => M): M[] {
    let currentNode = this as DoublyLinkedNode<V> | undefined;
    const list = [];
    while (typeof currentNode !== "undefined") {
      list.push(forEachNode(currentNode));
      const nextNode = currentNode._next;
      currentNode = nextNode;
    }
    return list;
  }
}
