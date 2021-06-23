import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})

export class MessageComponent {

  @Input()
  public type: number;
  @Input()
  public title: string;
  @Input()
  public message: string;

  constructor() {
  }
}
