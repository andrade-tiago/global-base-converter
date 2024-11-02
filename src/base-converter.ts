import CustomBase from "./custom-base";
import CustomBaseNumber from "./custom-base-number";

type ConverterProps = {
  value: string;
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
   * @param {string} value - The string representation of the number in the custom base.
   * @param {CustomBase} customBase - An instance of CustomBase defining the custom base and symbols.
   * @returns {number} The decimal representation of the custom base number.
   *
   * @throws {Error} If the value contains invalid symbols for the given custom base.
   */
  public static decode(value: string, customBase: CustomBase): number {
    return new CustomBaseNumber(value, customBase).toNumber();
  }

  /**
   * Encodes a decimal number into its string representation in a custom base.
   *
   * @param {number} value - The decimal number to be encoded.
   * @param {CustomBase} customBase - An instance of CustomBase defining the target base and symbols.
   * @returns {string} The string representation of the number in the target base.
   *
   * @throws {RangeError} If the value is negative.
   */
  public static encode(value: number, customBase: CustomBase): string {
    return new CustomBaseNumber(value).convertTo(customBase).toString();
  }

  /**
   * Converts a number from one custom base to another.
   *
   * @param {ConverterProps} props - An object containing the value and the original and target bases.
   * @param {string} props.value - The string representation of the number in the original base.
   * @param {CustomBase} props.originalBase - An instance of CustomBase defining the original base and symbols.
   * @param {CustomBase} props.targetBase - An instance of CustomBase defining the target base and symbols.
   * @returns {string} The string representation of the number in the target base.
   *
   * @throws {Error} If the value contains invalid symbols for the original base.
   */
  public static convert({ value, originalBase, targetBase }: ConverterProps): string {
    return new CustomBaseNumber(value, originalBase).convertTo(targetBase).toString();
  }
}
export default BaseConverter;
