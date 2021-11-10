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

  cols: number;
  rows: number;

  nodes: Array<Array<Node>> = [];

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

    this.nodes[5][5].state = State.start;
    this.nodes[5][10].state = State.end;
  }

  ngOnInit() {}
}
