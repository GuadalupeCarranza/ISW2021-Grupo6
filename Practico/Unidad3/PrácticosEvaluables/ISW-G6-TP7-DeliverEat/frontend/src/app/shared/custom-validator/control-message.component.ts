import {Component, Input} from '@angular/core';

@Component({
  selector: 'control-message',
  template: `
    <div *ngIf="show">
      <p>
        <ng-content></ng-content>
      </p>
    </div>`
})
export class ControlMessageComponent {
  @Input() error: string;
  show: boolean = false;

  showsErrorIncludedIn(errors: string[]): boolean {
    return errors.some((error) => error === this.error);
  }
}
