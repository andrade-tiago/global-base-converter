# GlobalBaseConverter

A flexible and powerful JavaScript/TypeScript library for working with numbers in custom numeric bases.  
GlobalBaseConverter allows you to create custom bases, convert numbers between them, and handle large numbers with precision.

> NOTE: Before using, check if the native `Number` or `BigInt` APIs fulfill your needs, as they also offer base conversion capabilities.
This library is for more complex cases requiring greater flexibility and customization.

## Key Features

- **Custom Base Support**: Define your own bases with unique symbols;
- **Multi-format**: Work with numbers in `string`, `number`, or `bigint` formats;
- **Inter-base Conversion**: Easily convert numbers between different custom bases;
- **Safe Conversions**: Verifies if the conversion to `number` is safe (for large values).

## Installation

```bash
npm i @andrade-tiago/global-base-converter
```

## Usage Examples

```ts
import { CustomBase, CustomBaseNumber } from '@andrade-tiago/global-base-converter';

const binaryBase = new CustomBase(['0', '1']);
const hexBase = new CustomBase("0123456789ABCDEF");

new CustomBaseNumber("101", binaryBase).toNumber(); // 5

new CustomBaseNumber(255).convertToBase(hexBase).toString(); // "FF"

new CustomBaseNumber(30, hexBase).toString(); // "1E"

new CustomBaseNumber("FF", hexBase).convertToBase(binaryBase).toString(); // "11111111"

new CustomBaseNumber("FF", hexBase).toBigInt(); // 255n

new CustomBaseNumber(255n, hexBase).toString(); // "FF"
```

## Documentation

### `CustomBase`

Represents a numeric base.

| Item | Description | Return |
| --- | --- | --- |
| `constructor(symbols: string \| string[])` | Creates a `CustomBase` instance | `CustomBase` |
| `base` | Gets the base (number of symbols) of the number | `number` |
| `getSymbolOfValue(value: number)` | Gets the symbol associated with a given value in the base | `string \| undefined` |
| `getSymbols()` | Gets an array with the base's symbols | `Array<string>` |
| `hasSymbol(symbol: string)` | Checks if the base contains a symbol | `boolean` |
| `valueOfSymbol(symbol: string)` | Gets the numeric value of a symbol in the base | `number \| undefined` |

### `CustomBaseNumber`

Represents a value in a custom base.

| Item | Description | Return |
| --- | --- | --- |
| `constructor(value: string, customBase: CustomBase)` | Creates a `CustomBaseNumber` instance | `CustomBaseNumber` |
| `constructor(value: number \| bigint, customBase?: CustomBase)` | Creates a `CustomBaseNumber` instance | `CustomBaseNumber` |
| `customBase` | Gets the `CustomBase` instance of the number | `CustomBase` |
| `canBeConvertedToNumberSafely()` | Checks if the value can be safely converted to `number` | `boolean` |
| `convertToBase(targetBase: CustomBase)` | Converts the value to the specified new base | `CustomBaseNumber` |
| `toBigInt()` | Converts the value to `bigint` | `bigint` |
| `toNumber()` | Converts the value to `number`, **if possible**, otherwise throws an error | `number` |
| `toString()` | Converts the value to a `string` in the provided base | `string` |

### Default Bases

For easier conversions, GlobalBaseConverter provides several predefined base instances:

| Base | Internal Name | Number of Symbols |
| --- | --- | ---: |
| Binary | `binaryBase` | 2 |
| Octal | `octalBase` | 8 |
| Decimal | `decimalBase` | 10 |
| Hexadecimal | `hexadecimalBase` | 16 |
| Base 58 | `base58` | 58 |
| Base 64 | `base64` | 64 |
