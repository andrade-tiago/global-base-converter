class CustomBase
{
  private readonly _symbolsArr: string[];
  private readonly _symbolsSet: Set<string>;

  constructor(symbols: string | string[])
  {
    if (symbols.length < 2)
    {
      throw new RangeError('At least two symbols are required for a base.');
    }
    if (typeof symbols === 'string')
    {
      symbols = [...symbols];
    }
    else
    {
      if (symbols.some(symbol => symbol.length !== 1))
      {
        throw new TypeError('Each symbol must be a single character.');
      }
    }

    this._symbolsSet = new Set(symbols);

    if (this._symbolsSet.size !== symbols.length)
    {
      throw new TypeError('Symbols must be unique.');
    }
    this._symbolsArr = symbols;
  }

  public get base(): number
  {
    return this._symbolsArr.length;
  }

  public hasSymbol(symbol: string): boolean
  {
    return this._symbolsSet.has(symbol);
  }

  public valueOfSymbol(symbol: string): number | undefined
  {
    return this.hasSymbol(symbol) ? this._symbolsArr.indexOf(symbol) : undefined;
  }

  public getSymbolOfValue(value: number): string | undefined
  {
    return this._symbolsArr[value];
  }

  public getSymbols(): string[]
  {
    return this._symbolsArr.map(x => x);
  }
}
export default CustomBase;
