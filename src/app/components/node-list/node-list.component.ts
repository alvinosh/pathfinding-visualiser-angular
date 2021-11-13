import { Component, OnInit } from '@angular/core';
import { Action } from 'src/app/interfaces/action';
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

  stateNames(): Array<string> {
    const keys = Object.keys(State);
    return keys.slice(keys.length / 2);
  }

  change_active(state: State) {
    this.selected_state = state;
    this.actions.new_action({ variant: 'state-change', state: this.selected_state });
  }

  constructor(public actions: ActionsService) {}

  ngOnInit(): void {}
}
