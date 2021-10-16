import { expect } from "chai";

import { calculateSalaryWithCPF, CPFPart } from "../../src/misc/cpf";

const cpfNames: Record<CPFPart, string> = {
  [CPFPart.TakeHome]: "Take Home Pay",
  [CPFPart.EmployeeCon]: "Employee's Contribution",
  [CPFPart.BasicPay]: "Basic Pay",
  [CPFPart.EmployerCon]: "Employer's Contribution",
  [CPFPart.Total]: "Total Contribution",
};

/**
 * @see https://www.cpf.gov.sg/eSvc/Web/Miscellaneous/ContributionCalculator/Index?isFirstAndSecondYear=0&isMember=1
 */
describe("Calculate CPF", () => {
  const expected: Record<CPFPart, number> = {
    [CPFPart.TakeHome]: 4000,
    [CPFPart.EmployeeCon]: 1000,
    [CPFPart.BasicPay]: 5000,
    [CPFPart.EmployerCon]: 850,
    [CPFPart.Total]: 5850,
  };
  (
    (Object.keys(expected) as CPFPart[]).map((cpfPart) => {
      return {
        amount: expected[cpfPart],
        type: cpfPart,
        employeeRate: 0.2,
        employerRate: 0.17,
      };
    }) as {
      amount: number;
      employeeRate: number;
      employerRate: number;
      type: CPFPart;
    }[]
  ).forEach((options) => {
    describe(`With ${cpfNames[options.type]} at S$${options.amount}...`, () => {
      const actual = calculateSalaryWithCPF(options);
      Object.values(CPFPart).forEach((salaryComponent) => {
        const expectedSalaryCompVal = expected[salaryComponent];
        const actualSalaryCompVal = actual[salaryComponent];
        it(`${cpfNames[salaryComponent]} should be S$${expectedSalaryCompVal}`, () => {
          expect(expectedSalaryCompVal).to.equal(actualSalaryCompVal);
        });
      });
    });
  });
});
