import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Action } from 'src/app/interfaces/action';
import { Algorithm } from 'src/app/interfaces/algorithm';
import { ActionsService } from 'src/app/services/actions.service';
import { Node, State } from '../../interfaces/node';
@Component({
  selector: 'grid',
  templateUrl: 'grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  State = State;

  cell_size = 30;

  mouse_down = false;

  cols: number;
  rows: number;

  nodes: Array<Array<Node>> = [];

  start_node_i: [number, number];
  end_node_i: [number, number];

  active_state: State = State.start;

  completed = false;

  animating = false;

  active_algorithm: Algorithm = 'a-star';

  change_node(i: number, j: number) {
    if (!this.mouse_down) return;
    switch (this.active_state) {
      case State.start:
        if (this.end_node_i[0] === i && this.end_node_i[1] === j) break;
        this.nodes[this.start_node_i[0]][this.start_node_i[1]].state = State.open;
        this.start_node_i = [i, j];
        this.nodes[this.start_node_i[0]][this.start_node_i[1]].state = State.start;
        this.recalc_path(this.active_algorithm);
        break;
      case State.end:
        if (this.start_node_i[0] === i && this.start_node_i[1] === j) break;
        this.nodes[this.end_node_i[0]][this.end_node_i[1]].state = State.open;
        this.end_node_i = [i, j];
        this.nodes[this.end_node_i[0]][this.end_node_i[1]].state = State.end;
        this.recalc_path(this.active_algorithm);
        break;
      case State.open:
        if (this.start_node_i[0] === i && this.start_node_i[1] === j) break;
        if (this.end_node_i[0] === i && this.end_node_i[1] === j) break;
        this.nodes[i][j].state = State.open;
        this.recalc_path(this.active_algorithm);
        break;
      case State.wall:
        if (this.start_node_i[0] === i && this.start_node_i[1] === j) break;
        if (this.end_node_i[0] === i && this.end_node_i[1] === j) break;
        this.nodes[i][j].state = State.wall;
        this.recalc_path(this.active_algorithm);
    }
  }

  recalc_path(alg: Algorithm) {
    if (!this.completed) return;
    switch (alg) {
      case 'a-star':
        this.a_star_algorithm(
          this.nodes[this.start_node_i[0]][this.start_node_i[1]],
          this.nodes[this.end_node_i[0]][this.end_node_i[1]],
        );
    }
  }

  handle_click_event(event: Event, state: boolean, i: number, j: number) {
    this.mouse_down = state;
    if (this.mouse_down) {
      this.change_node(i, j);
    }
    event.preventDefault();
    event.stopPropagation();
  }

  handle_action(action: Action) {
    switch (action.variant) {
      case 'state-change':
        this.active_state = action.state;
        break;
      case 'clear-board':
        this.reset_board();
        break;
      case 'run-algorithm':
        this.active_algorithm = action.algorithm;
        switch (action.algorithm) {
          case 'a-star':
            this.a_star_algorithm(
              this.nodes[this.start_node_i[0]][this.start_node_i[1]],
              this.nodes[this.end_node_i[0]][this.end_node_i[1]],
              true,
            );
        }
    }
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async a_star_algorithm(start: Node, end: Node, animate: boolean = false) {
    if (this.animating) return;
    this.animating = true;

    const smallest_f_cost = (array: Array<Node>): Node => {
      let smallest = array[0];
      array.forEach((node) => {
        if (node.f_cost < smallest.f_cost) {
          smallest = node;
        }
      });
      return this.nodes[smallest.row][smallest.col];
    };

    const find_nbors = (node: Node): Array<Node> => {
      const add_valid_nbor = (row: number, col: number) => {
        if (row < 0) return;
        if (col < 0) return;
        if (row > this.rows - 1) return;
        if (col > this.cols - 1) return;

        if (this.nodes[row][col].state === State.wall) return;

        nbors.push(this.nodes[row][col]);
      };

      let nbors: Array<Node> = [];

      add_valid_nbor(node.row - 1, node.col + 0);
      add_valid_nbor(node.row + 1, node.col + 0);
      add_valid_nbor(node.row + 0, node.col + 1);
      add_valid_nbor(node.row + 0, node.col - 1);

      //   diagonals
      //   add_valid_nbor(node.row - 1, node.col - 1);
      //   add_valid_nbor(node.row + 1, node.col + 1);
      //   add_valid_nbor(node.row - 1, node.col + 1);
      //   add_valid_nbor(node.row + 1, node.col - 1);

      return nbors;
    };

    const color_path = async (node: Node, animate: boolean) => {
      let n = node.prev_node;

      while (n?.prev_node) {
        if (animate) await this.delay(50);
        this.nodes[n.row][n.col].state = State.path;
        n = n.prev_node;
      }
    };

    const distance = (start: Node, end: Node): number => {
      return Math.sqrt((end.col - start.col) * (end.col - start.col) + (end.row - start.row) * (end.row - start.row));
    };

    this.clear_paths();

    let open_set: Array<Node> = [];

    open_set.push(this.nodes[start.row][start.col]);
    open_set[0].g_cost = 0;
    open_set[0].f_cost = distance(start, end);

    while (open_set.length !== 0) {
      let current = smallest_f_cost(open_set);

      if (current.row == end.row && current.col == end.col) {
        this.completed = true;
        this.animating = false;
        color_path(current, animate);
        return;
      }

      open_set = open_set.filter((node) => node !== current);
      let nbors = find_nbors(current);
      if (animate) await this.delay(50);

      for (let i = 0; i < nbors.length; i++) {
        const nbor = nbors[i];
        let t_gscore = current.g_cost + distance(current, nbor);
        if (t_gscore < nbor.g_cost) {
          nbor.prev_node = current;
          nbor.g_cost = t_gscore;
          nbor.f_cost = nbor.g_cost + distance(nbor, end);
          if (!open_set.includes(nbor)) {
            if (this.nodes[nbor.row][nbor.col].state === State.open)
              this.nodes[nbor.row][nbor.col].state = State.closed;
            open_set.push(nbor);
          }
        }
      }
    }

    this.animating = false;
  }

  clear_paths() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.nodes[i][j].state === State.path || this.nodes[i][j].state === State.closed) {
          this.nodes[i][j].state = State.open;
        }
        this.nodes[i][j].f_cost = Infinity;
        this.nodes[i][j].g_cost = Infinity;
        this.nodes[i][j].prev_node = undefined;
      }
    }
  }

  reset_board() {
    this.completed = false;

    this.nodes = [];

    for (let i = 0; i < this.rows; i++) {
      const cols: Array<Node> = [];
      for (let j = 0; j < this.cols; j++) {
        cols.push(new Node(State.open, i, j, this.cell_size));
      }
      this.nodes.push(cols);
    }

    this.nodes[this.start_node_i[0]][this.start_node_i[1]].state = State.start;
    this.nodes[this.end_node_i[0]][this.end_node_i[1]].state = State.end;
  }

  constructor(public actions: ActionsService) {
    this.actions.get_actions().subscribe((action: Action | null) => {
      if (action) this.handle_action(action);
    });

    let screen_width = window.innerWidth;
    let screen_height = window.innerHeight;

    this.cols = Math.ceil(screen_width / this.cell_size) + 1;
    this.rows = Math.ceil(screen_height / this.cell_size);

    this.start_node_i = [Math.floor(this.rows / 2), Math.floor(this.cols / 3)];
    this.end_node_i = [Math.floor(this.rows / 2), 2 * Math.floor(this.cols / 3)];

    this.reset_board();
  }

  ngOnInit() {}
}
