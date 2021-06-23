import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges
} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
/*import { ErrorMessages } from './custom-validators';*/
import {ControlMessageComponent} from './control-message.component';
import {Subscription} from 'rxjs';
import {ErrorMessages} from "./custom-validators";

@Component({
  selector: 'control-messages',
  template: `
    <div class="invalid-feedback" *ngIf="control.invalid && control.dirty">
      <p *ngIf="message" style="margin-bottom: 0">{{message}}</p>
      <ng-content></ng-content>
    </div>`
})
export class ControlMessagesComponent implements AfterContentInit, OnDestroy, OnChanges {

  @Input() control: FormControl;
  @ContentChildren(ControlMessageComponent) controlMessages: QueryList<ControlMessageComponent>;

  private statusChangesSubscription: Subscription;

  message: string;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.control.currentValue) {
      this.control = changes.control.currentValue;
      this.initControl();
    }
  }

  ngAfterContentInit(): void {
    this.initControl();
  }

  private initControl(): void {
    this.statusChangesSubscription =
      this.control
        .statusChanges
        .subscribe(() => {
          this.message = '';

          this.controlMessages.map(controlMessage => controlMessage.show = false);

          if (this.control.invalid && this.control.dirty) {
            let errors = Object.keys(this.control.errors);

            let firstErrorMessageComponent = this.controlMessages.find(controlMessage => {
              return controlMessage.showsErrorIncludedIn(errors);
            });
            if (firstErrorMessageComponent) {
              firstErrorMessageComponent.show = true;
            } else {
              this.message = this.errorMessage;
            }
          }
        });
  }

  ngOnDestroy() {
    this.statusChangesSubscription.unsubscribe();
  }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.dirty) {
        return ErrorMessages.messageOf(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }

  public static validarDetalleFormulario(form: FormArray) {
    for (let obj in form.controls) {
      ControlMessagesComponent.validateForm(form.get(obj) as FormGroup);
    }
  }

  public static validateForm(form: FormGroup) {
    for (let obj in form.controls) {
      if (form.get(obj).errors != null) {
        form.get(obj).markAsDirty();
        form.get(obj).updateValueAndValidity();
      }
    }
    document.body.scrollTop = 0;
  }

  public static valdiateInput(campos: FormControl[]): boolean {
    let bool = true;
    for (let campo of campos) {
      if (campo.errors) {
        campo.markAsDirty();
        campo.updateValueAndValidity();
        bool = false;
        document.body.scrollTop = 0;
      }
    }
    return bool;
  }
}
