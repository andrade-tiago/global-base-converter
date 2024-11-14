# GlobalBaseConverter

Uma biblioteca flexível e poderosa em JavaScript/TypeScript para trabalhar com números em bases numéricas personalizadas.
GlobalBaseConverter permite que você crie bases personalizadas, converta números entre elas e manipule números grandes com precisão.

> NOTA: Antes de usar, verifique se as APIs nativas `Number` ou `BigInt` não são o que você precisa,
pois elas também oferecem a possibilidade de conversão entre diferentes bases.
Essa biblioteca é para casos mais complexos e que exigem maior flexibilidade e customização.

## Recursos principais

- **Suporte a Bases Personalizadas**: Defina suas próprias bases com símbolos exclusivos;
- **Multiformato**: Trabalhe com números nos formatos `string`, `number` ou `bigint`;
- **Conversão Inter-base**: Converta números facilmente entre diferentes bases personalizadas;
- **Conversões Seguras**: Verifica se a conversão para `number` é segura (para valores grandes).

## Instalação

```bash
npm i @andrade-tiago/global-base-converter
```

## Exemplos de uso

```ts
import { CustomBase, CustomBaseNumber } from '@andrade-tiago/global-base-converter';

const binaryBase = new CustomBase(['0', '1']);
const hexBase = new CustomBase("0123456789ABCDEF");

new CustomBaseNumber("101", binaryBase).toNumber(); // 5

new CustomBaseNumber(255).convertToBase(hexDecimal).toString(); // "FF"

new CustomBaseNumber(30, hexBase).toString(); // "1E"

new CustomBaseNumber("FF", hexBase).convertToBase(binaryBase).toString(); // "11111111"

new CustomBaseNUmber("FF", hexBase).toBigInt(); // 255n

new CustomBaseNumber(255n, hexBase).toString(); // "FF"
```

## Documentação

### `CustomBase`

Representa uma base numérica.

| Item | Descrição | Retorno |
| --- | --- | --- |
| `constructor(symbols: string \| string[])` | Gera uma instância de `CustomBase` | `CustomBase` |
| `base` | Obtém a base (quantidade de símbolos) do número | `number` |
| `getSymbolOfValue(value: number)` | Obtém o símbolo associado a dado valor na base | `string \| undefined` |
| `getSymbols()` | Obtém um `array` com os símbolos da base | `Array<string>` |
| `hasSymbol(symbol: string)` | Verifica se a base contém um símbolo | `boolean` |
| `valueOfSymbol(symbol: string)` | Obtém o valor numérico de um símbolo na base | `number \| undefined` |


### `CustomBaseNumber`

Representa um valor numa base customizada.

| Item | Descrição | Retorno |
| --- | --- | --- |
| `constructor(value: string, customBase: CustomBase)` | Gera uma instância de `CustomBaseNumber` | `CustomBaseNumber` |
| `constructor(value: number \| bigint, customBase?: CustomBase)` | Gera uma instância de `CustomBaseNumber` | `CustomBaseNumber` |
| customBase | Obtém a instância `CustomBase` do número | `CustomBase` |
| `canBeConvertedToNumberSafely()` | Verifica se o valor pode ser convertido para `number` | `boolean` |
| `convertToBase(targetBase: CustomBase)` | Converte o valor para a nova base especificada | `CustomBaseNumber` |
| `toBigInt()` | Converte o valor para `bigint` | `bigint` |
| `toNumber()` | Converte o valor para `number`, **se possível**, caso contrário lança um erro | `number` |
| `toString()` | Converte o valor para `string` na base fornecida | `string` |

### Bases padrão

Para facilitar suas conversões, GlobalBaseConverter disponibiliza algumas instâncias de bases padrão:

| Base | Nome interno | Quantidade de símbolos |
| --- | --- | ---: |
| Binária | `binaryBase` | 2 |
| Octal | `octalBase` | 8 |
| Decimal | `decimalBase` | 10 |
| Hexadecimal | `hexadecimalBase` | 16 |
| Base 58 | `base58` | 58 |
| Base 64 | `base64` | 64 |
