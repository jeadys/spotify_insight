/**
 * Calculates the target attribute value for a full track based on the minimum and maximum values of the attribute.
 * @param {number} min The minimum value of the attribute.
 * @param {number} max The maximum value of the attribute.
 * @returns {number} The target attribute value, which is half the sum of the minimum and maximum values divided by 100.
 * @example calculateTargetAttribute(80, 100) // returns 0.9
 */
export const calculateTargetAttribute = (min: number, max: number): number => {
  return (min + max) / 2 / 100
}
