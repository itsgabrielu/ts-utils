import { expect } from "chai";

/**
 * @see https://www.jsv9000.app/
 */
const getOrderOfLogs = () => {
  console.log(
    "Synchronously execute the script as though it were a function body. Run until the call stack is empty.",
  );
  console.log("Evaluating timeout.");
  setTimeout(function timeoutTask() {
    console.log(
      "With the script evaluated and microtasks queue empty, microtask queue will push the timeoutTask() task frame into the call stack, executing it, then leaves the call stack immediately.",
    );
    console.log("4 / 4");
  }, 0);
  console.log(
    "Evaluated timeout. The event loop detects timeoutTask() callback, pushes it into the task queue (callback queue) via the Web API. As script is still evaluating, timeoutTask() stays in the task queue.",
  );
  console.log(
    "Evaluating instantiated promise. executor() is executed on instantiation so it is evaluated, and is pushed onto the call stack by the event loop.",
  );
  new Promise(function executor(resolve) {
    console.log("executor() is now evaluated and synchronously executed.");
    console.log("1 / 4");
    console.log(
      "resolve() is evaluated as thenFn() and enters the microtasks queue.",
    );
    resolve("3 / 4");
    console.log(
      "As the call stack is still evaluating executor() and the script, thenFn() stays there until the call stack is clear.",
    );
    console.log(
      "executor() has been evaluated and executed and is popped from the call stack. Script evaluation continues.",
    );
  }).then(function thenFn(value) {
    console.log(
      "With the call stack clear, thenFn() is pushed from the microtasks queue onto the call stack by the event loop to be evaluated and synchonously executed.",
    );
    console.log(value);
    console.log(
      `thenFn() has been evaluated and clears the frame from the call stack.`,
    );
  });
  console.log("Promise instantiation has been evaluated.");
  console.log("2 / 4");
  console.log(
    "Script finishes evaluating, popping the script evaluation frame out of the call stack, leaving the call stack empty. As there is still a task (timeoutTask()) and microtask (thenFn()) queued, the priority goes to the microtasks.",
  );
};

/**
 * TODO: Figure out logging test guarantee
 */
describe("Order of logs", () => {
  [undefined].forEach(() => {
    describe(`For the problem`, () => {
      it(`should give the order of logs`, async () => {
        getOrderOfLogs();
      });
    });
  });
});
