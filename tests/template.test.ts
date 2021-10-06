import { expect } from "chai";

describe("Template", () => {
  [undefined].forEach(() => {
    describe(`Sub description`, () => {
      it("should know 2 equals 2", () => {
        expect(2).to.equal(2);
      });
    });
  });
});
