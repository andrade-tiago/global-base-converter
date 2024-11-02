import CustomBase from '../custom-base';

/**
 * Instance of base 58, which uses a series of alphanumeric characters.
 * This base is often used in applications that require compact encoding,
 * such as shortened URLs and cryptocurrency addresses.
 * 
 * The base 58 consists of the following characters:
 * - Digits: 1-9
 * - Uppercase letters: A-Z (excluding O and I)
 * - Lowercase letters: a-z (excluding l)
 * 
 * @type {CustomBase}
 * @constant
 */
const base58 = new CustomBase([
  '1', '2', '3', '4', '5', '6', '7', '8',
  '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
  'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q',
  'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
  'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
  'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p',
  'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
  'y', 'z',
]);
export default base58;
