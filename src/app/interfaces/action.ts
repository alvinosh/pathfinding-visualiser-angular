import { State } from './node';

export type Action = { variant: 'state-change'; state: State };
