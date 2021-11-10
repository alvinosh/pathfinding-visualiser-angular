export enum State {
  start,
  end,
  path,
  open,
  closed,
  wall,
}

export class Node {
  state: State;
  row: number;
  col: number;
  g_cost: number;

  size: number;

  constructor(state: State, row: number, col: number, size: number) {
    this.state = state;
    this.row = row;
    this.col = col;
    this.g_cost = 0;
    this.size = size;
  }
}
