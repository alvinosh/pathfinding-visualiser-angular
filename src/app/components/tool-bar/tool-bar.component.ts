import { Component, OnInit } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Algorithm, Pattern } from 'src/app/interfaces/algorithm';
import { ActionsService } from 'src/app/services/actions.service';
@Component({
  selector: 'tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
  faCaretDown = faCaretDown;

  algorithm: boolean = false;
  pattern: boolean = false;

  selected_algorithm: Algorithm = 'a-star';
  selected_pattern: Pattern = 'recursive-div';

  select_algorithm(alg: Algorithm) {
    this.selected_algorithm = alg;
    this.actions.new_action({ variant: 'algorithm-change', algorithm: alg });
  }
  select_pattern(pat: Pattern) {
    this.selected_pattern = pat;
    this.actions.new_action({ variant: 'pattern-change', pattern: pat });
  }

  clear_board() {
    this.actions.new_action({ variant: 'clear-board' });
  }

  run_algorithm() {
    this.actions.new_action({ variant: 'run-algorithm', algorithm: this.selected_algorithm });
  }

  run_pattern() {
    this.actions.new_action({ variant: 'run-pattern', pattern: this.selected_pattern });
  }

  algorithm_toggle() {
    this.pattern = false;
    this.algorithm = !this.algorithm;
  }

  pattern_toggle() {
    this.algorithm = false;
    this.pattern = !this.pattern;
  }

  constructor(public actions: ActionsService) {}

  ngOnInit(): void {}
}
