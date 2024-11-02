/**
 * CustomBase class
 * Represents a custom numeric base defined by specific symbols.
 * Used to validate and encapsulate the logic for custom numeric systems.
 */
class CustomBase {
  /**
   * Symbols representing each digit in the custom base.
   * Must be unique, single-character strings, matching the specified base length.
   * 
   * @type {string[]}
   */
  public readonly symbols: string[];

  /**
   * Initializes a new instance of the CustomBase class with a corresponding set of symbols.
   * The symbols define each character in the base, and the base is automatically derived from their count.
   * Allows symbols to be provided either as a string (e.g., '0123456789ABCDEF') or as an array of characters.
   * 
   * @param {string | string[]} symbols - A string or array of unique, single-character strings representing symbols in the base.
   * 
   * @throws {RangeError} If fewer than two symbols are provided.
   * @throws {TypeError} If any symbol in an array is not a single character.
   * @throws {TypeError} If symbols are not unique.
   */
  constructor(symbols: string | string[]) {
    if (symbols.length < 2) {
      throw new RangeError('At least two symbols are required for a base.');
    }
    if (typeof symbols === 'string') {
      symbols = [...symbols];
    } else {
      if (symbols.some(symbol => symbol.length !== 1)) {
        throw new TypeError('Each symbol must be a single character.');
      }
    }
    if (new Set(symbols).size !== symbols.length) {
      throw new TypeError('Symbols must be unique.');
    }
    this.symbols = symbols;
  }

  /**
   * Gets the base, which is the number of unique symbols.
   * 
   * @returns {number} The base (radix) of the custom numeric system.
   */
  public get base(): number {
    return this.symbols.length;
  }
}
export default CustomBase;
