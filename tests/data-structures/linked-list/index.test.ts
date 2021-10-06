import { expect } from "chai";
import {
  DoublyLinkedNode,
  SinglyLinkedNode,
} from "../../../src/data-structures/linked-list";

const testSets = [
  [[27, 45, 76], 76, [27, /* 76, */ 45]],
  [
    [123, 1231, 234, 2131, 1213, 1231, 1231, 898],
    234,
    [123, 1231, /* 234, */ 2131, 1213, 1231, 1231, 898],
  ],
  [
    [123, 1231, 12313133, 9080, 123, 131231],
    9080,
    [123, 1231, 12313133, /* 09080, */ 123, 131231],
  ],
] as [input: number[], nrToRemove: number, expected: number[]][];

describe("Linked Lists", () => {
  testSets.forEach(([input, nrToRemove, expected]) => {
    describe(`For ${input}`, () => {
      it("should be able to initialise values for singly linked lists", () => {
        const linkedList = new SinglyLinkedNode(input);
        const arrayifiedLinkedList = linkedList.map((n) => n.value);
        expect(arrayifiedLinkedList).to.deep.equal(input);
      });
      it("should be able remove nodes for singly linked lists", () => {
        const linkedList = new SinglyLinkedNode(input);
        linkedList.removeNode((n) => n.value === nrToRemove);
        const arrayifiedLinkedList = linkedList.map((n) => n.value);
        expect(arrayifiedLinkedList).to.deep.equal(expected);
      });
      it("should be able to initialise values for doubly linked lists", () => {
        const linkedList = new DoublyLinkedNode(input);
        const arrayifiedLinkedList = linkedList.map((n) => n.value);
        expect(arrayifiedLinkedList).to.deep.equal(input);
      });
      it("should be able remove nodes for doubly linked lists", () => {
        const linkedList = new DoublyLinkedNode(input);
        linkedList.removeNode((n) => n.value === nrToRemove);
        const arrayifiedLinkedList = linkedList.map((n) => n.value);
        expect(arrayifiedLinkedList).to.deep.equal(expected);
      });
    });
  });
});
