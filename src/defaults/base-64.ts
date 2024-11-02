import CustomBase from '../custom-base';

/**
 * Instance of base 64, which utilizes a set of 64 alphanumeric characters.
 * This encoding scheme is commonly used for encoding binary data
 * in applications such as email encoding and data transmission.
 * 
 * The base 64 consists of the following characters:
 * - Uppercase letters: A-Z
 * - Lowercase letters: a-z
 * - Digits: 0-9
 * - Additional characters: + and /
 * 
 * @type {CustomBase}
 * @constant
 */
const base64 = new CustomBase([
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
  'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
  'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
  'Y', 'Z',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
  'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
  'y', 'z',
  '0', '1', '2', '3', '4', '5', '6', '7',
  '8', '9',
  '+', '/',
]);
export default base64;
