/** Locale-aware number without thousands grouping (so years stay "2019", not "2.019"). */
export function formatNumber(value: number, locale: string, decimals = 0) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: false,
  }).format(value);
}

/** Same as formatNumber, but always signed ("+12", "-0.4", "0"). */
export function formatSigned(value: number, locale: string, decimals = 0) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: false,
    signDisplay: 'exceptZero',
  }).format(value);
}
