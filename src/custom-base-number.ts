import CustomBase from './custom-base';
import { decimalBase } from './defaults';

/**
 * Represents a number in a custom numeric base defined by the CustomBase class.
 * Supports conversion to/from custom base representation, along with conversions to other formats.
 */
class CustomBaseNumber
{
  public readonly customBase: CustomBase;
  private _number?: number;
  private _encodedValue?: string;
  private _bigInt?: bigint;
  private _canBeConvertedToNumberSafely?: boolean;

  constructor(value: string, customBase: CustomBase);
  constructor(value: number | bigint, customBase?: CustomBase);

  /**
   * Initializes a new instance of the CustomBaseNumber class.
   * Supports either:
   * - A custom base string with a CustomBase instance.
   * - A decimal number or bigint with an optional CustomBase instance.
   *
   * @param {string|number|bigint} value - The number, either as a string in a custom base, a decimal number, or bigint.
   * @param {CustomBase} [customBase] - Optional. CustomBase instance; required for string input.
   *
   * @throws {SyntaxError} If customBase is missing when value is a string.
   * @throws {TypeError|RangeError} For invalid number, bigint, or string format.
   */
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

  /**
   * Checks if the number can be converted to a safe JavaScript number.
   * 
   * @returns {boolean} True if safe to convert to a number; otherwise, false.
   */
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

  /**
   * Converts the current CustomBaseNumber to a specified target base.
   * 
   * @param {CustomBase} targetBase - The target CustomBase for conversion.
   * @returns {CustomBaseNumber} A new CustomBaseNumber in the target base.
   */
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

  /**
   * Converts the current value to a bigint.
   * 
   * @returns {bigint} The numeric value as a bigint.
   */
  public toBigInt(): bigint
  {
    return this._bigInt ??= (this._number !== undefined)
      ? this.calcBigIntFromNumber()
      : this.calcBigIntFromEncodedValue()
  }

  /**
   * Converts the current value to a custom base string.
   * 
   * @returns {string} The string representation in the custom base.
   */
  public toString(): string
  {
    return this._encodedValue ??= (this._number !== undefined)
      ? this.calcEncodedValueFromNumber()
      : this.calcEncodedValueFromBigInt()
  }

  /**
   * Converts the current value to a number if safe.
   * 
   * @returns {number} The numeric value as a number.
   * @throws {Error} If the number cannot be safely converted.
   */
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
