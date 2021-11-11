import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/interfaces/node';

@Component({
  selector: 'node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.scss'],
})
export class NodeListComponent implements OnInit {
  State = State;

  selected_state = State.start;

  change_active(state: State) {
    this.selected_state = state;
  }

  constructor() {}

  ngOnInit(): void {}
}
