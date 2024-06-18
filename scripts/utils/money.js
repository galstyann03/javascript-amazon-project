// function for formatting the cents to dollars
export function formatCurrency(priceCents) {
  return (priceCents/ 100).toFixed(2);
}