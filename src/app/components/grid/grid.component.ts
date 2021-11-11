import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Node, State } from '../../interfaces/node';
@Component({
  selector: 'grid',
  templateUrl: 'grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @ViewChildren('node') node_components: QueryList<any>;

  cell_size = 30;

  mouse_down = false;

  cols: number;
  rows: number;

  nodes: Array<Array<Node>> = [];

  start_node_i: [number, number] = [5, 5];
  end_node_i: [number, number] = [5, 10];

  active_node: State = State.start;

  change_node(i: number, j: number) {
    if (!this.mouse_down) return;
    switch (this.active_node) {
      case State.start:
        if (this.end_node_i[0] === i && this.end_node_i[1] === j) break;
        this.nodes[this.start_node_i[0]][this.start_node_i[1]].state = State.open;
        this.start_node_i = [i, j];
        this.nodes[this.start_node_i[0]][this.start_node_i[1]].state = State.start;
        break;
      case State.end:
        if (this.start_node_i[0] === i && this.start_node_i[1] === j) break;
        this.nodes[this.start_node_i[0]][this.start_node_i[1]].state = State.open;
        this.end_node_i = [i, j];
        this.nodes[this.start_node_i[0]][this.start_node_i[1]].state = State.end;
    }
  }

  toggle_down(state: boolean) {
    this.mouse_down = state;
  }

  constructor() {
    let screen_width = window.innerWidth;
    let screen_height = window.innerHeight;

    this.cols = Math.floor(screen_width / this.cell_size);
    this.rows = Math.floor(screen_height / this.cell_size);

    for (let i = 0; i < this.rows; i++) {
      const cols: Array<Node> = [];
      for (let j = 0; j < this.cols; j++) {
        cols.push(new Node(State.closed, i, j, this.cell_size));
      }
      this.nodes.push(cols);
    }

    this.nodes[this.start_node_i[0]][this.start_node_i[1]].state = State.start;
    this.nodes[this.end_node_i[0]][this.end_node_i[1]].state = State.end;
  }

  ngOnInit() {}
}
