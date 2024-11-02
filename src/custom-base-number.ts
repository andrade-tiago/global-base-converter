import BaseConverter from './base-converter';
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
  private encodedValue?: string;

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
   * @throws {TypeError} if the custom base string contains symbols not defined in customBase.
   */
  constructor(value: string | number, customBase?: CustomBase) {
    if (typeof value === 'number') {
      customBase ||= decimalBase;

      this.customBase = customBase;
      this.value = value;
    } else {
      if (!customBase) {
        throw new SyntaxError('A CustomBase instance is required for string input.');
      }
      this.customBase = customBase;
      this.value = BaseConverter.decode(value, customBase);
      this.encodedValue = value;
    }
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
    this.encodedValue ||= BaseConverter.encode(this.value, this.customBase)

    return this.encodedValue;
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
