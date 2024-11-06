class CustomBase
{
  private readonly _symbolsArr: Array<string>;
  private readonly _symbolsMap: Map<string, number>;

  constructor(symbols: string | string[])
  {
    if (symbols.length < 2)
    {
      throw new RangeError('At least two symbols are required for a base.');
    }

    if (typeof symbols !== 'string')
    {
      if (symbols.some(symbol => symbol.length !== 1))
      {
        throw new TypeError('Each symbol must be a single character.');
      }
      this._symbolsArr = symbols;
    }

    if (new Set(symbols).size !== symbols.length)
    {
      throw new TypeError('Symbols must be unique.');
    }

    this._symbolsArr ??= [...symbols];
    this._symbolsMap = new Map();
    this._symbolsArr.forEach((char, index) =>
    {
      this._symbolsMap.set(char, index);
    });
  }

  public get base(): number
  {
    return this._symbolsArr.length;
  }

  public hasSymbol(symbol: string): boolean
  {
    return this._symbolsMap.has(symbol);
  }

  public valueOfSymbol(symbol: string): number | undefined
  {
    return this._symbolsMap.get(symbol);
  }

  public getSymbolOfValue(value: number): string | undefined
  {
    return this._symbolsArr[value];
  }

  public getSymbols(): string[]
  {
    return [...this._symbolsArr];
  }
}
export default CustomBase;
