import { Algorithm, Pattern } from './algorithm';
import { State } from './node';

export type Action =
  | { variant: 'state-change'; state: State }
  | { variant: 'algorithm-change'; algorithm: Algorithm }
  | { variant: 'run-algorithm'; algorithm: Algorithm }
  | { variant: 'pattern-change'; pattern: Pattern }
  | { variant: 'clear-board' };
