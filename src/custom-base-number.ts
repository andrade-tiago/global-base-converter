import CustomBase from './custom-base';
import { decimalBase } from './defaults';

/**
 * CustomBaseNumber class
 * Represents a number in a customizable numeric base defined by the CustomBase class.
 * Provides methods for converting to and from different bases, as well as string and decimal representations.
 */
class CustomBaseNumber {
  public readonly customBase: CustomBase;
  private readonly value: number;

  /**
   * Initializes a new instance of the CustomBaseNumber class.
   * Allows initialization with:
   * 1. A custom base string and a CustomBase instance.
   * 2. A decimal number, with an optional CustomBase instance (defaults to base 10).
   *
   * @param {string | number} value - The number in the custom base as a string, or a decimal number.
   * @param {CustomBase} [customBase] - Optional. An instance of CustomBase defining the numeric base and symbols.
   *
   * @throws {RangeError} if a number is negative or non-integer.
   * @throws {SyntaxError} if customBase is missing for string input.
   * @throws {Error} if the custom base string contains symbols not defined in customBase.
   */
  constructor(value: string | number, customBase?: CustomBase) {
    if (typeof value === 'number') {
      if (value < 0 || !Number.isInteger(value)) {
        throw new RangeError('Value must be a non-negative integer.');
      }
      this.customBase = customBase || decimalBase;
      this.value = value;
    } else {
      if (!customBase) {
        throw new SyntaxError('A CustomBase instance is required for string input.');
      }
      this.customBase = customBase;
      this.value = this.decode(value);
    }
  }

  /**
   * Decodes a custom base string to its decimal value.
   *
   * @param {string} customBaseStr - String representing the number in the custom base.
   * @returns {number} The decimal (base 10) equivalent of the custom base number.
   *
   * @throws {TypeError} if the string contains symbols not present in the custom base.
   */
  private decode(customBaseStr: string): number {
    let result = 0;
    const length = customBaseStr.length;

    for (let i = 0; i < length; i++) {
      const symbol = customBaseStr[i];
      const symbolValue = this.customBase.symbols.indexOf(symbol);

      if (symbolValue === -1) {
        throw new TypeError(`Invalid symbol "${symbol}" for this custom base.`);
      }

      result = result * this.customBase.base + symbolValue;
    }

    return result;
  }

  /**
   * Converts the CustomBaseNumber instance to its decimal representation.
   *
   * @returns {number} The decimal representation of the number.
   */
  public toNumber(): number {
    return this.value;
  }

  /**
   * Converts the number to its string representation in the custom base.
   *
   * @returns {string} The string form of the number in the custom base.
   */
  public toString(): string {
    if (this.value === 0) {
      return this.customBase.symbols[0];
    }

    let num = this.value;
    let result = '';

    do {
      const remainder = num % this.customBase.base;
      result = this.customBase.symbols[remainder] + result;
      num = Math.floor(num / this.customBase.base);
    } while (num > 0);

    return result;
  }

  /**
   * Converts the current CustomBaseNumber to a new instance in a target base.
   *
   * @param {CustomBase} targetBase - An instance of CustomBase defining the desired base and symbols.
   * @returns {CustomBaseNumber} A new CustomBaseNumber instance with the same value in the specified base.
   */
  public convertTo(targetBase: CustomBase): CustomBaseNumber {
    return new CustomBaseNumber(this.value, targetBase);
  }
}
export default CustomBaseNumber;
