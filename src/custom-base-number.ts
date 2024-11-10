import CustomBase from './custom-base';
import { decimalBase } from './defaults';

class CustomBaseNumber
{
  public readonly customBase: CustomBase;
  private _number?: number;
  private _encodedValue?: string;
  private _bigInt?: bigint;
  private _canBeConvertedToNumberSafely?: boolean;

  constructor(value: string, customBase: CustomBase);
  constructor(value: number | bigint, customBase?: CustomBase);

  constructor(value: string | number | bigint, customBase?: CustomBase)
  {
    if (typeof value === 'string')
    {
      if (!customBase)
      {
        throw new SyntaxError('A CustomBase instance is required for string input.');
      }
      CustomBaseNumber.validateStringValue(value, customBase);

      this._encodedValue = value;
    }
    else
    {
      customBase ??= decimalBase;

      if (typeof value === 'number')
      {
        CustomBaseNumber.validateNumberValue(value);

        this._number = value;
      }
      else
      {
        CustomBaseNumber.validateBigIntValue(value);

        this._bigInt = value;
      }
    }
    this.customBase = customBase;
  }

  public canBeConvertedToNumberSafely(): boolean
  {
    if (this._canBeConvertedToNumberSafely !== undefined)
    {
      return this._canBeConvertedToNumberSafely;
    }
    if (this._number !== undefined)
    {
      return this._canBeConvertedToNumberSafely = true;
    }

    this._bigInt ??= this.calcBigIntFromEncodedValue();

    return this._canBeConvertedToNumberSafely = (this._bigInt <= BigInt(Number.MAX_SAFE_INTEGER));
  }

  public convertToBase(targetBase: CustomBase): CustomBaseNumber
  {
    if (this.canBeConvertedToNumberSafely())
    {
      this._number ??= this.calcNumberFromEncodedValue();

      return new CustomBaseNumber(this._number, targetBase);
    }
    else
    {
      this._bigInt ??= this.calcBigIntFromEncodedValue();

      return new CustomBaseNumber(this._bigInt, targetBase);
    }
  }

  public toBigInt(): bigint
  {
    return this._bigInt ??= (this._number !== undefined)
      ? this.calcBigIntFromNumber()
      : this.calcBigIntFromEncodedValue()
  }

  public toString(): string
  {
    return this._encodedValue ??= (this._number !== undefined)
      ? this.calcEncodedValueFromNumber()
      : this.calcEncodedValueFromBigInt()
  }

  public toNumber(): number
  {
    if (this.canBeConvertedToNumberSafely())
    {
      return this._number ??= (this._bigInt !== undefined)
        ? this.calcNumberFromBigInt()
        : this.calcNumberFromEncodedValue()
    }
    throw new Error('This custom base number cannot be converted to a number safely.');
  }


  
  private calcBigIntFromEncodedValue(): bigint
  {
    let decimalValue = BigInt(0);
    const baseSize = BigInt(this.customBase.base);

    for (const symbol of this._encodedValue!)
    {
      const symbolValue = BigInt(this.customBase.valueOfSymbol(symbol)!);

      decimalValue = (decimalValue * baseSize) + symbolValue;
    }
    return decimalValue;
  }

  private calcBigIntFromNumber(): bigint
  {
    return BigInt(this._number!);
  }

  private calcNumberFromEncodedValue(): number
  {
    let decimalValue = 0;

    for (const symbol of this._encodedValue!)
    {
      const symbolValue = this.customBase.valueOfSymbol(symbol)!;

      decimalValue = (decimalValue * this.customBase.base) + symbolValue;
    }
    return decimalValue;
  }

  private calcNumberFromBigInt(): number
  {
    return Number(this._bigInt!);
  }

  private calcEncodedValueFromNumber(): string
  {
    if (this._number! === 0)
    {
      return this.customBase.getSymbolOfValue(0)!;
    }

    let result = '';
    let value = this._number!;

    do
    {
      const remainder = value % this.customBase.base;
      result = this.customBase.getSymbolOfValue(remainder)! + result;
      value = Math.floor(value / this.customBase.base);
    }
    while (value > 0);

    return result;
  }

  private calcEncodedValueFromBigInt(): string
  {
    const ZERO = BigInt(0);

    if (this._bigInt! === ZERO)
    {
      return this.customBase.getSymbolOfValue(0)!;
    }

    const BASE = BigInt(this.customBase.base);
    let result = '';
    let value = this._bigInt!;

    do {
      const remainder = Number(value % BASE);
      result = this.customBase.getSymbolOfValue(remainder)!.concat(result);
      value = value / BASE;
    }
    while (value > ZERO);

    return result;
  }

  private static validateStringValue(value: string, customBase: CustomBase): void
  {
    for (const symbol of value)
    {
      if (!customBase.hasSymbol(symbol))
      {
        throw new TypeError(`Invalid symbol "${symbol}" for the given custom base.`);
      }
    }
  }

  private static validateNumberValue(value: number): void
  {
    if (!Number.isInteger(value))
    {
      throw new TypeError('Number input must be an integer value.');
    }
    if (value < 0)
    {
      throw new RangeError('Number input must be greater than zero.');
    }
    if (value > Number.MAX_SAFE_INTEGER)
    {
      throw new RangeError('Number input exceeds the maximum safe integer.');
    }
  }

  private static validateBigIntValue(value: bigint): void
  {
    if (value < BigInt(0))
    {
      throw new RangeError('BigInt input must be greater than zero.');
    }
  }
}
export default CustomBaseNumber;
