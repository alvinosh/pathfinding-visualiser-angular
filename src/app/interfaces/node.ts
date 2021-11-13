export enum State {
  start = 'start',
  end = 'end',
  path = 'path',
  open = 'open',
  closed = 'closed',
  wall = 'wall',
}

export class Node {
  state: State;
  row: number;
  col: number;
  g_cost: number;
  f_cost: number;

  prev_node: Node | undefined;

  size: number;

  constructor(state: State, row: number, col: number, size: number) {
    this.state = state;
    this.row = row;
    this.col = col;
    this.g_cost = Infinity;
    this.f_cost = Infinity;
    this.prev_node = undefined;
    this.size = size;
  }

  reset() {
    this.row = this.row;
    this.col = this.col;
    this.g_cost = Infinity;
    this.f_cost = Infinity;
    this.prev_node = undefined;
    this.size = this.size;
  }
}
