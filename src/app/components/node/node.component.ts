import { Component, Input, OnInit } from '@angular/core';
import { Node, State } from 'src/app/interfaces/node';

@Component({
  selector: 'node',
  templateUrl: 'node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit {
  State = State;

  @Input('node') node: Node;

  constructor() {}

  ngOnInit() {}
}
