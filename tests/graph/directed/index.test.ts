import { expect } from "chai";

import { addOneAndOne } from "../../../src/graph/directed";

describe("Directed Graph", () => {
  it("should add 1 and 1 and get 2", () => {
    expect(addOneAndOne()).to.equal(2);
  });
});
