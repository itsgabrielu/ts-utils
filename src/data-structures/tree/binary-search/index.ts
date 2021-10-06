export class BinarySearchTreeNode<V> {
  value: V;
  left: BinarySearchTreeNode<V> | undefined;
  right: BinarySearchTreeNode<V> | undefined;
  constructor(initialisedValue: V) {
    this.value = initialisedValue;
  }
}
