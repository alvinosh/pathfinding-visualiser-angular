import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Action } from '../interfaces/action';

@Injectable({ providedIn: 'root' })
export class ActionsService {
  actions: BehaviorSubject<Action | null>;

  new_action(action: Action) {
    this.actions.next(action);
  }

  get_actions(): BehaviorSubject<Action | null> {
    return this.actions;
  }

  constructor() {
    this.actions = new BehaviorSubject<Action | null>(null);
  }
}
