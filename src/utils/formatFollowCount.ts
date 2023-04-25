/**
 * Format follow count to human readable version
 *
 * @param {number} followCount - The follower count to format.
 * @param {number} decimalDigits - The amount of decimal digits to display after the decimal point.
 * @returns {string} The formatted follower count.
 * @example formatFollowCount(299792458, 1); // returns '299.8M'
 */
export const formatFollowCount = (followCount: number, decimalDigits: number): string => {
  const regex = /\.0+$|(\.[0-9]*[1-9])0+$/
  const formats = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const format = formats
    .slice()
    .reverse()
    .find(function (format) {
      return followCount >= format.value
    })

  return format ? (followCount / format.value).toFixed(format.symbol === 'k' ? 0 : decimalDigits).replace(regex, '$1') + format.symbol : '0'
}
