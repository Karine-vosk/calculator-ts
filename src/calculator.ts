type InvestmentData = {
  initialAmount: number;
  annualContribution: number;
  expectedReturn: number;
  duration: number;
};

type InvestmentResult = {
  year: number;
  totalAmount: number;
  totalContributions: number;
  totalInterestEarned: number;
};

//type CalculationResult = InvestmentResult[] | string;

type CalculationResult =
  | { success: true; data: InvestmentResult[] }
  | { success: false; error: string };

function msg(error: string): CalculationResult {
  return { success: false, error };
}

function calculateInvestment(data: InvestmentData): CalculationResult {
  const { initialAmount, annualContribution, expectedReturn, duration } = data;

  if (initialAmount < 0) {
    msg('Initial investment amount must be at least zero!');
  }

  if (duration < 0) {
    msg('No valid of amount of years provided.');
  }

  if (expectedReturn < 0) {
    msg('Expected return must be at least zero.');
  }

  let total = initialAmount;
  let totalContributions = 0;
  let totalInterestEarned = 0;

  const annualResults: InvestmentResult[] = [];
  for (let i = 0; i < duration; i++) {
    total = total * (1 + expectedReturn);
    totalInterestEarned = total - totalContributions - initialAmount;
    totalContributions = totalContributions + annualContribution;
    total = total + annualContribution;

    annualResults.push({
      year: i + 1,
      totalAmount: total,
      totalInterestEarned,
      totalContributions,
    });
  }

  return {
    success: true,
    data: annualResults,
  };
}

function printResults(results: CalculationResult) {
  if (!results.success) {
    console.log(results);
    return;
  }

  for (const yearnEndResult of results.data) {
    console.log(yearnEndResult.year);
    console.log(`Total: ${yearnEndResult.totalAmount.toFixed(0)}`);
    console.log(
      `Total Contributions: ${yearnEndResult.totalContributions.toFixed(0)}`
    );
    console.log(
      `Total Interested Earned: ${yearnEndResult.totalInterestEarned.toFixed(
        0
      )}`
    );
    console.log('------------------------');
  }
}

const investmentData: InvestmentData = {
  initialAmount: 5000,
  annualContribution: 500,
  expectedReturn: 0.20,
  duration: 10,
};

const results = calculateInvestment(investmentData);

printResults(results);
