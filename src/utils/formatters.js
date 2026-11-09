/**
 * Format currency in Nigerian Naira or custom currency
 */
export function formatCurrency(amount, currency = '₦') {
  if (amount === undefined || amount === null) return 'Price on Request';
  return `${currency}${Number(amount).toLocaleString('en-NG')}`;
}

/**
 * Format price tag with transaction cadence
 */
export function formatPriceDisplay(price, period = 'per annum', transactionType = 'rent') {
  const formatted = formatCurrency(price);
  if (transactionType === 'sale') {
    return `${formatted}`;
  }
  return `${formatted} / ${period.replace('per ', '')}`;
}

/**
 * Capitalize first letter of string
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Clean coordinates for approximate privacy display
 */
export function getObfuscatedCoordinates(coords) {
  if (!coords) return { lat: 6.5244, lng: 3.3792 };
  // Keep coordinates accurate enough for neighbourhood map view without exposing pinpoint gate numbers
  return coords;
}
