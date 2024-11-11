import {
  CustomBaseNumber,
  binaryBase,
  hexadecimalBase as hexBase,
  hexadecimalBase,
} from '@/.';

describe('CustomBaseNumber', () =>
{
  describe('should create a CustomBaseNumber from', () =>
  {
    test('a string with CustomBase', () =>
    {
      const num = new CustomBaseNumber('1011', binaryBase);
      expect(num.toString()).toBe('1011');
      expect(num.toNumber()).toBe(11);
    });

    test('a number with its new CustomBase', () =>
    {
      const num = new CustomBaseNumber(255, hexBase);
      expect(num.toNumber()).toBe(255);
      expect(num.toString()).toBe('FF');
    });

    test('a number without CustomBase (defaults to decimal)', () =>
    {
      const num = new CustomBaseNumber(32);
      expect(num.toNumber()).toBe(32);
      expect(num.toString()).toBe('32');
    });

    test('a BigInt with its new CustomBase', () =>
    {
      const num = new CustomBaseNumber(BigInt(255), hexBase);
      expect(num.toNumber()).toBe(255);
      expect(num.toString()).toBe('FF');
    });

    test('a BigInt without CustomBase (defaults to decimal)', () =>
    {
      const num = new CustomBaseNumber(BigInt(32));
      expect(num.toNumber()).toBe(32);
      expect(num.toString()).toBe('32');
    });
  });

  describe('should throw error if', () =>
  {
    // test('string input is provided without a CustomBase', () =>
    // {
    //   expect(() => new CustomBaseNumber('1011'))
    //     .toThrow('A CustomBase instance is required for string input.');
    // });

    test('string input contains invalid symbols', () =>
    {
      expect(() => new CustomBaseNumber('102', binaryBase))
        .toThrow('Invalid symbol "2" for the given custom base.');
    });

    test('number input is less than zero', () =>
    {
      expect(() => new CustomBaseNumber(-1))
        .toThrow('Number input must be greater than zero.');
    });

    test('number input is not an integer', () =>
    {
      expect(() => new CustomBaseNumber(1.1))
        .toThrow('Number input must be an integer value.');
    });

    test('number input is greater than Number.MAX_SAFE_INTEGER', () =>
    {
      expect(() => new CustomBaseNumber(Number.MAX_SAFE_INTEGER + 1))
        .toThrow('Number input exceeds the maximum safe integer.');
    });

    test('bigint input is less than zero.', () =>
    {
      expect(() => new CustomBaseNumber(BigInt(-1)))
        .toThrow('BigInt input must be greater than zero.');
    });

    test('number is unsafe for conversion', () =>
    {
      const num = new CustomBaseNumber(BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1));
  
      expect(() => num.toNumber())
        .toThrow('This custom base number cannot be converted to a number safely.');
    });
  });

  describe('should correctly compute', () =>
  {
    test('encoded value from BigInt', () =>
    {
      const num = new CustomBaseNumber(BigInt(255), hexBase);
      expect(num.toString()).toBe('FF');
    });

    test('encoded value from number', () =>
    {
      const num = new CustomBaseNumber(255, hexBase);
      expect(num.toString()).toBe('FF');
    });

    test('number value from encoded value', () =>
    {
      const num = new CustomBaseNumber('111', binaryBase);
      expect(num.toNumber()).toBe(7);
    });

    test('number value from bigint', () =>
    {
      const num = new CustomBaseNumber(BigInt(16), binaryBase);
      expect(num.toNumber()).toBe(16);
    });

    test('bigint value from encoded value', () =>
    {
      const num = new CustomBaseNumber('111', binaryBase);
      expect(num.toBigInt()).toBe(BigInt(7));
    });

    test('bigint value from number value', () =>
    {
      const num = new CustomBaseNumber(7);
      expect(num.toBigInt()).toBe(BigInt(7));
    });
  });

  describe('should convert according to context', () =>
  {
    const num = new CustomBaseNumber(16, hexadecimalBase);

    test('to string', () =>
    {
      expect(`${num}`).toBe('10');
    });
  });

  test('should correctly convert between bases', () =>
  {
    const num = new CustomBaseNumber(255);
    expect(num.convertToBase(hexBase).toString()).toBe('FF');
  });
});
