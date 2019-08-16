import { Algorithm, AlgorithmStrings } from './algorithm';
import { Alphabet } from './alphabet';

export type PartialOptions = Partial<Options>;

export interface Options {
  algorithm: Algorithm | AlgorithmStrings;
  alphabet: Alphabet | string;
  domain: string;
  index: number;
  length: number;
  username: string;
}
