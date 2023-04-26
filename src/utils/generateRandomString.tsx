/**
 * Generates a random string containing uppercase and lowercase letters and digits.
 *
 * @param {number} length - The desired length of the generated string.
 * @returns {string} - A string of the specified length containing random characters.
 *
 * @example
 * // returns a random string with length 10, e.g. "jT4Fq8sW6R"
 * generateRandomString(10)
 *
 * @example
 * // returns an empty string, since the length parameter is 0
 * generateRandomString(0)
 */
export const generateRandomString = (length: number): string => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters[randomIndex]
  }

  return result
}
