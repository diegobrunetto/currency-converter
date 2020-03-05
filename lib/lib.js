const endpoint = 'https://api.exchangeratesapi.io/latest';

const ratesByBase = {};

export async function fetchRates(base = 'USD') {
  const res = await fetch(`${endpoint}?base=${base}`);
  const rates = await res.json();
  return rates;
}

export async function convert(amount, from, to) {
  // check if i have the rates to convert
  if (!ratesByBase[from]) {
    const rates = await fetchRates(from);
    ratesByBase[from] = rates;
  }
  const rate = ratesByBase[from].rates[to];
  const convertedAmount = rate * amount;
  console.log(`${amount} ${from} is ${convertedAmount} in ${to}`);
  return convertedAmount;
}
