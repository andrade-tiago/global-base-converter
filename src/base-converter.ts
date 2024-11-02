import CustomBase from "./custom-base";

type ConverterProps = {
  encodedValue: string;
  originalBase: CustomBase;
  targetBase: CustomBase;
};

/**
 * BaseConverter class
 * Provides static methods for encoding, decoding, and converting numbers in custom bases.
 */
class BaseConverter {
  /**
   * Decodes a custom base string into its decimal number representation.
   *
   * @param {string} encodedValue - The string representation of the number in the custom base.
   * @param {CustomBase} customBase - An instance of CustomBase defining the custom base and symbols.
   * @returns {number} The decimal representation of the custom base number.
   *
   * @throws {TypeError} If the value contains invalid symbols for the given custom base.
   */
  public static decode(encodedValue: string, customBase: CustomBase): number {
    const strLength = encodedValue.length;
    let result = 0;

    for (let i = 0; i < strLength; i++) {
      const symbol = encodedValue[i];
      const symbolValue = customBase.symbols.indexOf(symbol);

      if (symbolValue === -1) {
        throw new TypeError(`Invalid symbol "${symbol}" for this custom base.`);
      }

      result = result * customBase.base + symbolValue;
    }
    return result;
  }

  /**
   * Encodes a decimal number into its string representation in a custom base.
   *
   * @param {number} value - The decimal number to be encoded.
   * @param {CustomBase} targetBase - An instance of CustomBase defining the target base and symbols.
   * @returns {string} The string representation of the number in the target base.
   *
   * @throws {RangeError} If the value is negative or non-integer.
   */
  public static encode(value: number, targetBase: CustomBase): string {
    if (value < 0 || !Number.isInteger(value)) {
      throw new RangeError('Value must be a non-negative integer.');
    }

    let result = '';

    while (value > 0) {
      const remainder = value % targetBase.base;
      result = targetBase.symbols[remainder] + result;
      value = Math.floor(value / targetBase.base);
    }
    return result || targetBase.symbols[0];
  }

  /**
   * Converts a number from one custom base to another.
   *
   * @param {ConverterProps} props - An object containing the encoded value and the original and target bases.
   * @param {string} props.encodedValue - The string representation of the number in the original base.
   * @param {CustomBase} props.originalBase - An instance of CustomBase defining the original base and symbols.
   * @param {CustomBase} props.targetBase - An instance of CustomBase defining the target base and symbols.
   * @returns {string} The string representation of the number in the target base.
   *
   * @throws {TypeError} If the encoded value contains invalid symbols for the original base.
   */
  public static convert({ encodedValue, originalBase, targetBase }: ConverterProps): string {
    const value = BaseConverter.decode(encodedValue, originalBase);

    return BaseConverter.encode(value, targetBase);
  }
}
export default BaseConverter;
