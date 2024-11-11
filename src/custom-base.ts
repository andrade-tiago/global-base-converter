/**
 * Represents a custom numeric base with specified symbols.
 * Ensures the base is valid and the symbols meet requirements.
 */
class CustomBase
{
  private readonly _symbolsArr: Array<string>;
  private readonly _symbolsMap: Map<string, number>;

  /**
   * Initializes a new instance of the CustomBase class.
   * 
   * @param {string|string[]} symbols - Symbols defining the base, as a string or array of single-character strings.
   * 
   * @throws {RangeError} If fewer than two symbols are provided.
   * @throws {TypeError} If any symbol is not a single character or if symbols are not unique.
   */
  constructor(symbols: string | string[])
  {
    if (symbols.length < 2)
    {
      throw new RangeError('At least two symbols are required for a base.');
    }

    if (typeof symbols === 'string')
    {
      this._symbolsArr = [...symbols];
    }
    else
    {
      if (symbols.some(symbol => symbol.length !== 1))
      {
        throw new TypeError('Each symbol must be a single character.');
      }
      this._symbolsArr = symbols;
    }

    this._symbolsMap = new Map();
    this._symbolsArr.forEach((char, index) =>
    {
      this._symbolsMap.set(char, index);
    });

    if (this._symbolsMap.size !== symbols.length)
    {
      throw new TypeError('Symbols must be unique.');
    }
  }

  /**
   * Gets the base as an integer representing the number of symbols.
   * 
   * @returns {number} The numeric base.
   */
  public get base(): number
  {
    return this._symbolsArr.length;
  }

  /**
   * Checks if the base includes a specified symbol.
   * 
   * @param {string} symbol - The symbol to check.
   * @returns {boolean} True if symbol exists; otherwise, false.
   */
  public hasSymbol(symbol: string): boolean
  {
    return this._symbolsMap.has(symbol);
  }

  /**
   * Gets the value of a symbol in the base.
   * 
   * @param {string} symbol - The symbol to get the value of.
   * @returns {number|undefined} The numeric value of the symbol, or undefined if not found.
   */
  public valueOfSymbol(symbol: string): number | undefined
  {
    return this._symbolsMap.get(symbol);
  }

  /**
   * Gets the symbol for a specific value in the base.
   * 
   * @param {number} value - The value to retrieve the symbol for.
   * @returns {string|undefined} The symbol for the given value, or undefined if out of range.
   */
  public getSymbolOfValue(value: number): string | undefined
  {
    return this._symbolsArr[value];
  }

  /**
   * Gets all symbols in the base.
   * 
   * @returns {string[]} An array of symbols for the base.
   */
  public getSymbols(): string[]
  {
    return [...this._symbolsArr];
  }
}
export default CustomBase;
