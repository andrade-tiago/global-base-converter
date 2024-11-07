import { CustomBase } from "@/.";

describe('CustomBase', () =>
{
  test('should create instances correctly', () =>
  {
    const base1 = new CustomBase('012345');
    const base2 = new CustomBase([ '0', '1', '2', '3', '4', '5' ]);

    expect(base1.base).toBe(6);
    expect(base2.base).toBe(6);
    expect(base1.getSymbols()).toEqual([ '0', '1', '2', '3', '4', '5' ]);
    expect(base2.getSymbols()).toEqual([ '0', '1', '2', '3', '4', '5' ]);
  });
  
  describe('should throw error if', () =>
  {
    test('less than two symbols are provided', () =>
    {
      expect(() => new CustomBase(  '1'  )).toThrow('At least two symbols are required for a base.');
      expect(() => new CustomBase([ 'A' ])).toThrow('At least two symbols are required for a base.');
    });
  
    test('symbols are not unique', () =>
    {
      expect(() => new CustomBase(   '0112345'   )).toThrow('Symbols must be unique.');
      expect(() => new CustomBase(['0', '1', '1'])).toThrow('Symbols must be unique.');
    });
  });

  describe('should correctly map', () =>
  {
    const base = new CustomBase('ABCD');

    test('symbols to values', () =>
    {
      expect(base.valueOfSymbol('A')).toBe(0);
      expect(base.valueOfSymbol('C')).toBe(2);
      expect(base.valueOfSymbol('E')).toBeUndefined();
    });

    test('values to symbols', () =>
    {
      expect(base.getSymbolOfValue(1)).toBe('B');
      expect(base.getSymbolOfValue(3)).toBe('D');
      expect(base.getSymbolOfValue(4)).toBeUndefined();
    });
  });

  test('should correctly detect symbols in base', () =>
  {
    const base = new CustomBase('01');

    expect(base.hasSymbol('0')).toBe(true);
    expect(base.hasSymbol('1')).toBe(true);
    expect(base.hasSymbol('2')).toBe(false);
  });
});
