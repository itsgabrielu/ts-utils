export enum CPFPart {
  TakeHome = "TakeHome",
  EmployeeCon = "EmployeeCon",
  BasicPay = "BasicPay",
  EmployerCon = "EmployerCon",
  Total = "Total",
}

/**
 * CPF Contribution Calculator (for Singapore Citizens / 3rd year and onwards Singapore Permanent Residents)
 * @param options
 * @returns
 */
export const calculateSalaryWithCPF = (options: {
  type: CPFPart;
  amount: number;
  // Assume rate is more than 0 and less than 1
  employeeRate?: number;
  // Assume rate is more than 0 and less than 1
  employerRate?: number;
}): Record<CPFPart, number> => {
  const { employeeRate = 0.2, employerRate = 0.17, type, amount } = options;
  const result = {
    [CPFPart.TakeHome]: NaN,
    [CPFPart.EmployeeCon]: NaN,
    [CPFPart.BasicPay]: NaN,
    [CPFPart.EmployerCon]: NaN,
    [CPFPart.Total]: NaN,
  };
  result[type] = amount;
  switch (type) {
    case CPFPart.TakeHome:
      result[CPFPart.BasicPay] = result[CPFPart.TakeHome] / (1 - employeeRate);
      result[CPFPart.EmployeeCon] =
        result[CPFPart.BasicPay] - result[CPFPart.TakeHome];
      result[CPFPart.EmployerCon] = result[CPFPart.BasicPay] * employerRate;
      result[CPFPart.Total] =
        result[CPFPart.BasicPay] + result[CPFPart.EmployerCon];
      break;
    case CPFPart.EmployeeCon:
      result[CPFPart.BasicPay] = result[CPFPart.EmployeeCon] / employeeRate;
      result[CPFPart.TakeHome] =
        result[CPFPart.BasicPay] - result[CPFPart.EmployeeCon];
      result[CPFPart.EmployerCon] = result[CPFPart.BasicPay] * employerRate;
      result[CPFPart.Total] =
        result[CPFPart.BasicPay] + result[CPFPart.EmployerCon];
      break;
    case CPFPart.BasicPay:
      result[CPFPart.EmployeeCon] = result[CPFPart.BasicPay] * employeeRate;
      result[CPFPart.TakeHome] =
        result[CPFPart.BasicPay] - result[CPFPart.EmployeeCon];
      result[CPFPart.EmployerCon] = result[CPFPart.BasicPay] * employerRate;
      result[CPFPart.Total] =
        result[CPFPart.BasicPay] + result[CPFPart.EmployerCon];
      break;
    case CPFPart.EmployerCon:
      result[CPFPart.BasicPay] = result[CPFPart.EmployerCon] / employerRate;
      result[CPFPart.Total] =
        result[CPFPart.BasicPay] + result[CPFPart.EmployerCon];
      result[CPFPart.EmployeeCon] = result[CPFPart.BasicPay] * employeeRate;
      result[CPFPart.TakeHome] =
        result[CPFPart.BasicPay] - result[CPFPart.EmployeeCon];
      break;
    case CPFPart.Total:
      result[CPFPart.BasicPay] = result[CPFPart.Total] / (1 + employerRate);
      result[CPFPart.EmployerCon] =
        result[CPFPart.Total] - result[CPFPart.BasicPay];
      result[CPFPart.EmployeeCon] = result[CPFPart.BasicPay] * employeeRate;
      result[CPFPart.TakeHome] =
        result[CPFPart.BasicPay] - result[CPFPart.EmployeeCon];
      break;
    default:
      break;
  }
  return (Object.keys(result) as CPFPart[]).reduce((acc, key) => {
    acc[key] = parseFloat(result[key].toFixed(2));
    return acc;
  }, {} as Record<CPFPart, number>);
};
