import { AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isString } from 'util';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';

const NUMBER_REGEXP = /^\d+$/;
const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
const DECIMAL_REGEXP = /^-?\d+(\.?\d+)?$/;
const DECIMAL_WITH_TWO_DIGITS_REGEXP = /^[0-9]+([.][0-9]{0,2})?$/;
const TEXT_REGEXP = /[a-zA-Z ]{2,60}/;
const TEXT_NUMBER_REGEXP = /[^0-9a-zA-Z]/g;
const FILENAME_REGEXP = /^([a-zA-Z_\-\d])+$/;
const PASSWORD_REGEXP = /^(?=.*[A-Z])(?=.*[!@#$&*.])(?=.*[0-9])(?=.*[a-z]).{8,16}$/g;
const DATE_REGEXP = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
const NARANJA = /^4[0-9]{3}-?[0-9]{4}-?[0-9]{4}-?[0-9]{4}$/;

export function isEmpty(value: any): boolean {
  return isNullOrUndefined(value)
    || (isString(value) && value === '');
}

export class CustomValidators {

  public static areaCode(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return null;
    }
    return (control.value > 9) ? null : {codArea: true};
  }

  public static phoneNumber(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return null;
    }
    return (control.value > 9) ? null : {phoneNumber: true};
  }

  public static number(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return null;
    }
    return NUMBER_REGEXP.test(control.value) ? null : {number: true};
  }

  public static decimalNumber(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return null;
    }
    return DECIMAL_REGEXP.test(control.value) ? null : {number: true};
  }

  public static decimalNumberWithTwoDigits(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return null;
    }
    return DECIMAL_WITH_TWO_DIGITS_REGEXP.test(control.value) ? null : {'twodecimal': true};
  }

  public static email(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return null;
    }
    return EMAIL_REGEXP.test(control.value) ? null : {email: true};
  }

  public static validText(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return null;
    }
    return (control.value.toString().replace(TEXT_REGEXP, '').length === 0) ? null : {validText: true};
  }

  public static validPassword(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return null;
    }
    let retu = PASSWORD_REGEXP.test(control.value) ? null : {validPassword: true};
    return retu;
  }

  public static validTextAndNumbers(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return null;
    }
    return (control.value.toString().replace(TEXT_NUMBER_REGEXP, '').length !== 0) ? null : {validTextAndNumbers: true};
  }

  public static fileName(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return null;
    }
    return FILENAME_REGEXP.test(control.value) ? null : {fileName: true};
  }

  public static minValue(minValue: number): ValidatorFn {

    return (control) => {
      let number = CustomValidators.number(control);

      if (!isNullOrUndefined(number)) {
        return number;
      }

      if (isEmpty(control.value)) {
        return null;
      }

      const value = parseInt(control.value, 10);

      return isNaN(value) || (value < minValue) ?
        {minvalue: {requiredValue: minValue, actualValue: control.value}} :
        null;
    };
  }

  public static maxValue(maxValue: number) {
    return (control) => {

      let number = CustomValidators.number(control);

      if (!isNullOrUndefined(number)) {
        return number;
      }

      if (isEmpty(control.value)) {
        return null;
      }

      const value = parseInt(control.value, 10);

      return isNaN(value) || (value > maxValue) ?
        {maxvalue: {requiredValue: maxValue, actualValue: control.value}} :
        null;
    };
  }

  public static minDecimalValue(minValue: number): ValidatorFn {

    return (control) => {
      let number = CustomValidators.decimalNumber(control);

      if (!isNullOrUndefined(number)) {
        return number;
      }

      if (isEmpty(control.value)) {
        return null;
      }

      const value = parseFloat(control.value);

      return isNaN(value) || (value < minValue) ?
        {minvalue: {requiredValue: minValue, actualValue: control.value}} :
        null;
    };
  }

  public static maxDecimalValue(maxValue: number) {
    return (control) => {

      let number = CustomValidators.decimalNumber(control);

      if (!isNullOrUndefined(number)) {
        return number;
      }

      if (isEmpty(control.value)) {
        return null;
      }

      const value = parseFloat(control.value);

      return isNaN(value) || (value > maxValue) ?
        {maxvalue: {requiredValue: maxValue, actualValue: control.value}} :
        null;
    };
  }

  public static diffTo(valor: any): ValidatorFn {

    return (control) => {

      if (isEmpty(control.value)) {
        return null;
      }

      let actualValue = control.value;

      if (!isNaN(valor)) {
        actualValue = parseFloat(actualValue);
      }

      return (actualValue !== valor) ?
        null :
        {diffTo: {requiredValue: valor, actualValue: control.value}};
    };
  }

  public static digitNumber(digitos: number): ValidatorFn {

    return (control) => {
      let number = CustomValidators.number(control);

      if (!isNullOrUndefined(number)) {
        return number;
      }

      if (isEmpty(control.value)) {
        return null;
      }

      const valorActual = control.value;
      return (valorActual.toString().length === digitos) ?
        null :
        {digitNumber: {requiredValue: digitos, actualValue: control.value}};
    };
  }

  public static soloUnCampo(controlsToVerify?: string[]): ValidatorFn {
    return (group) => {
      let hasValue: number = 0;
      if (group && group instanceof FormGroup && group.controls) {
        for (let control in controlsToVerify) {
          if (group.controls.hasOwnProperty(control) && group.controls[control].valid
            && group.controls[control].value) {
            hasValue++;
          }
        }
      }
      return hasValue <= 1 ? null : {oneInputOnly: {requiredValue: true, actualValue: hasValue}};
    };
  }

  public static atLeastOneInput(group: AbstractControl, controlsToVerify?: string): ValidationErrors | null {
    let isAtLeastOne = false;
    if (group && group instanceof FormGroup && group.controls) {
      if (group.controls.hasOwnProperty(controlsToVerify) && group.controls[controlsToVerify].valid
        && group.controls[controlsToVerify].value) {
        isAtLeastOne = true;
      }
    }
    return isAtLeastOne ? null : {atLeastOneInput: true};
  }

  public static atLeastOneItem(controlAVerificar?: string, nombreItem?: string): ValidatorFn {
    return (array) => {
      let atLeastOneItem: boolean = false;
      if (array && array instanceof FormArray && array.controls) {
        for (let group in array.controls) {
          let atLeastOneInput = CustomValidators.atLeastOneInput(array.controls[group], controlAVerificar);
          if (atLeastOneInput === null) {
            atLeastOneItem = true;
            break;
          }
        }
      }
      return atLeastOneItem ? null : {
        atLeastOneItem: {
          requiredValue: true,
          actualValue: atLeastOneItem,
          item: nombreItem
        }
      };
    };
  }

  public static haveFilters(group: FormGroup): ValidationErrors {
    let haveFilter = false;
    if (group && group instanceof FormGroup && group.controls &&
      Object.getOwnPropertyNames(group.controls).some((property) =>
        group.controls[property].value && group.controls[property].valid)) {
      haveFilter = true;
    }
    return haveFilter ? {haveFilters: true} : null;
  }

  static toDate(toDate?: Date): ValidatorFn {
    return (control) => {
      if (isEmpty(control.value) || isEmpty(toDate)) {
        return null;
      }
      toDate.setHours(0, 0, 0, 0);

      return (toDate < control.value) ?
        {
          toDate: {
            requiredValue: toDate.toLocaleDateString(),
            actualValue: control.value,
            textValue: 'Debe ser menor o igual a la fecha'
          }
        } : null;
    };
  }

  public static date(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return null;
    }
    return DATE_REGEXP.test(control.value) ? null : {date: true};
  }

  static minDate(): ValidatorFn {
    return (control) => {
      if (isEmpty(control.value)) {
        return null;
      }
      control.value.setHours(0, 0, 0, 0);

      const toDay = new Date();
      toDay.setHours(0, 0, 0, 0);

      return (control.value < toDay) ?
        {
          toDate: {
            requiredValue: toDay.toLocaleDateString(),
            actualValue: new Date(),
            textValue: 'Debe ser mayor o igual a la fecha'
          }
        } : null;
    };
  }

  static fromDate(fromDate?: Date): ValidatorFn {
    return (control) => {
      if (isEmpty(control.value) || isEmpty(fromDate)) {
        return null;
      }
      fromDate.setHours(0, 0, 0, 0);

      return (fromDate > control.value) ?
        {
          fromDate: {
            requiredValue: fromDate.toLocaleDateString(),
            actualValue: control.value,
            textValue: 'Debe ser mayor o igual a la fecha'
          }
        } : null;
    };
  }

  public static document(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return null;
    }
    let number = CustomValidators.number(control);
    if (!isNullOrUndefined(number)) {
      return number;
    }
    const valorActual = control.value.toString();
    return (valorActual.length <= 8 && valorActual.length >= 6) ?
      null : {document: true};

  }

  public static naranja(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return null;
    }
    return NARANJA.test(control.value) ? null : {naranja: true};

  }

}


export class ErrorMessages {
  public static messageOf(validatorName: string, validatorValue?: any) {
    let config = {
      areaCode: 'Debe ingresar un código válido.',
      phoneNumber: 'Debe ingresar un número válido.',
      validText: 'Debe ingresar un texto válido.',
      validTextAndNumbers: 'Debe ingresar un texto válido.',
      required: 'El campo es requerido.',
      number: 'Ingresar sólo números.',
      email: 'El email es inválido.',
      maxlength: `No superar los ${validatorValue.requiredLength} caracteres.`,
      minlength: `Ingresar al menos ${validatorValue.requiredLength} caracteres.`,
      minvalue: `El valor mínimo es ${validatorValue.requiredValue}.`,
      maxvalue: `El valor máximo es ${validatorValue.requiredValue}.`,
      minDate: `La fecha mínima es ${validatorValue.requiredValue}.`,
      maxDate: `La fecha máxima es ${validatorValue.requiredValue}.`,
      minDecimalValue: `El valor mínimo es ${validatorValue.requiredValue}.`,
      digitNumber: `La cantidad de digitos requerida es ${validatorValue.requiredValue}.`,
      date: 'Ingresar sólo fechas.',
      atLeastOneInput: 'Al menos un campo es requerido.',
      atLeastOneItem: `Al menos un ${validatorValue.item} es requerido y debe ser marcado como entregado.`,
      oneInputOnly: 'Solo un campo es permitido.',
      diffTo: `El valor debe ser distinto a ${validatorValue.requiredValue}.`,
      twodecimal: 'Solo se admiten números positivos y con dos decimales.',
      fileName: 'Solo se admiten letras, guiones y números.',
      validPassword: 'Debe ingresar una contraseña válida.',
      toDate: `${validatorValue.textValue}: ${validatorValue.requiredValue}.`,
      fromDate: `${validatorValue.textValue}: ${validatorValue.requiredValue}.`,
      document: 'Ingresar un documento valido.',
      naranja: 'Debe ingresar una tarjeta valida (VISA).',
    };
    return config[validatorName];
  }
}
