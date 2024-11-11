# GlobalBaseConverter

A flexible and powerful library for working with numbers in custom numeric bases.
GlobalBaseConverter allows you to create custom bases, convert numbers between them, and handle large numbers accurately.

> NOTE: Before using, check if the native `Number` or `BigInt` APIs are not what you need,
as they also offer the possibility of converting between different bases.

This library is for more complex cases that require greater flexibility and customization.

## Main features

- **Custom Base Support**: Define your own bases with unique symbols;
- **Multiformat**: Work with numbers in `string`, `number` or `bigint` formats;
- **Inter-base Conversion**: Easily convert numbers between different custom bases;
- **Safe Conversions**: Checks if the conversion to `number` is safe for large values;

## Usage examples

```ts
const binaryBase = CustomBase(['0', '1']);
const hexBase = CustomBase("0123456789ABCDEF");

new CustomBaseNumber("101", binaryBase).toNumber(); // 5

new CustomBaseNumber(255).convertToBase(hexDecimal).toString(); // "FF"

new CustomBaseNumber(30, hexBase).toString(); // "1E"

new CustomBaseNumber("FF", hexBase).convertToBase(binaryBase).toString(); // "11111111"

new CustomBaseNUmber("FF", hexBase).toBigInt(); // 255n

new CustomBaseNumber(255n, hexBase).toString(); // "FF"
```
