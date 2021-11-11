import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Action } from 'src/app/interfaces/action';
import { ActionsService } from 'src/app/services/actions.service';
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

  active_state: State = State.start;

  change_node(i: number, j: number) {
    if (!this.mouse_down) return;
    switch (this.active_state) {
      case State.start:
        if (this.end_node_i[0] === i && this.end_node_i[1] === j) break;
        this.nodes[this.start_node_i[0]][this.start_node_i[1]].state = State.open;
        this.start_node_i = [i, j];
        this.nodes[this.start_node_i[0]][this.start_node_i[1]].state = State.start;
        break;
      case State.end:
        if (this.start_node_i[0] === i && this.start_node_i[1] === j) break;
        this.nodes[this.end_node_i[0]][this.end_node_i[1]].state = State.open;
        this.end_node_i = [i, j];
        this.nodes[this.end_node_i[0]][this.end_node_i[1]].state = State.end;
        break;
      case State.wall:
        if (this.start_node_i[0] === i && this.start_node_i[1] === j) break;
        if (this.end_node_i[0] === i && this.end_node_i[1] === j) break;
        if (this.nodes[i][j].state !== State.wall) {
          this.nodes[i][j].state = State.wall;
        } else {
          this.nodes[i][j].state = State.open;
        }
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
    }
  }

  constructor(public actions: ActionsService) {
    this.actions.get_actions().subscribe((action: Action | null) => {
      if (action) this.handle_action(action);
    });

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
