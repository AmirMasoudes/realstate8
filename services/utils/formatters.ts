/**
 * Formatters utility
 * Format price, area, and other values for display
 */

/**
 * Format price with thousands separator
 */
export function formatPrice(price: number, currency: string = "Toman"): string {
  const formatted = new Intl.NumberFormat("fa-IR").format(price);
  const currencyText = currency === "Toman" ? "تومان" : currency;
  return formatted + " " + currencyText;
}

/**
 * Format area with unit
 */
export function formatArea(area: number, unit: string = "متر مربع"): string {
  const formatted = new Intl.NumberFormat("fa-IR").format(area);
  return formatted + " " + unit;
}

/**
 * Format number with thousands separator
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("fa-IR").format(num);
}

