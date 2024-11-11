# GlobalBaseConverter

Uma biblioteca flexível e poderosa para trabalhar com números em bases numéricas personalizadas.
GlobalBaseConverter permite que você crie bases personalizadas, converta números entre elas e manipule números grandes com precisão.

> NOTA: Antes de usar, verifique se as APIs nativas `Number` ou `BigInt` não são o que você precisa,
pois elas também oferecem a possibilidade de conversão entre diferentes bases.
Essa biblioteca é para casos mais complexos e que exigem maior flexibilidade e customização.

## Recursos principais

- **Suporte a Base Personalizada**: Defina suas próprias bases com símbolos exclusivos;
- **Multiformato**: Trabalhe com números nos formatos `string`, `number` ou `bigint`;
- **Conversão Inter-base**: Converta números facilmente entre diferentes bases personalizadas;
- **Converões Seguras**: Verifica se a conversão para `number` é segura para valores grandes;

## Exemplos de uso

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

