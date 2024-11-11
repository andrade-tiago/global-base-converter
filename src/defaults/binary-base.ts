import CustomBase from '../custom-base';

/**
 * Instance of binary base, which uses two symbols: 0 and 1.
 * This base is fundamental in computer science and digital systems,
 * as it represents the simplest form of data encoding.
 * 
 * The binary base consists of the following characters:
 * - 0: Represents the off state.
 * - 1: Represents the on state.
 * 
 * @constant
 */
const binaryBase = new CustomBase([
  '0', '1',
]);
export default binaryBase;
