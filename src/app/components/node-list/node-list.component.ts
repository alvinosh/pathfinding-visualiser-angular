import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/interfaces/node';
import { ActionsService } from 'src/app/services/actions.service';

@Component({
  selector: 'node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.scss'],
})
export class NodeListComponent implements OnInit {
  State = State;

  selected_state = State.start;
  previous_state = State.start;

  eraser: boolean = false;

  stateNames(): Array<string> {
    const keys = Object.keys(State);
    return keys.slice(keys.length / 2);
  }

  change_active(state: State) {
    if (this.selected_state !== State.open) {
      this.previous_state = this.selected_state;
    }
    this.selected_state = state;
    this.actions.new_action({ variant: 'state-change', state: this.selected_state });
  }

  constructor(public actions: ActionsService) {}

  ngOnInit(): void {}
}
