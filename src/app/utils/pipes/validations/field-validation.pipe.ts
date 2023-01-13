import { Pipe, PipeTransform } from '@angular/core';
import { generalMessageErrors } from '@data/constants/errors/generalMessages';
import { regEx } from '@data/constants/validation/regEx';

@Pipe({
  name: 'fieldValidation'
})
export class FieldValidationPipe implements PipeTransform {

  errors: any[];

  transform(value: any, restrictions: any): any[] {

    this.errors = [];

    // if the field is required
    restrictions.required && (!value || value === '(___) ___-____' || value.length === 0) && value !== 0 ? this.errors.push(generalMessageErrors.field.required) : null;

    // if the field has a range of characters
    (value
      && restrictions.minLength
      && restrictions.maxLength
      && (value.length < restrictions.minLength || value.length > restrictions.maxLength)
    ) || (!value
      && restrictions.minLength
      && restrictions.maxLength
      )
      ? this.errors.push(generalMessageErrors.field.range + restrictions.minLength + ' y ' + restrictions.maxLength + ' caracteres')
      : null;

    // if the field has a minimum number of characters
    (value && restrictions.minLength && !(restrictions.maxLength) && value.length < restrictions.minLength)
      || (!value && restrictions.minLength && !(restrictions.maxLength)
      )
      ? this.errors.push(generalMessageErrors.field.minLength + restrictions.minLength + ' caracteres') : null;

    // // if the patter is not valid we push the error
    // if (value && restrictions.pattern && restrictions.pattern === 'rfc') {
    //   if (!regEx.fields.rfc.test(value)) {
    //     this.errors.push(generalMessageErrors.rfc.type);
    //   }
    // }

    // if the field is an email
    (value
      && restrictions.pattern
      && restrictions.pattern === 'email'
      && !regEx.fields.email.test(value)
    ) || (!value
      && restrictions.pattern
      && restrictions.pattern === 'email'
    )
    ? this.errors.push(generalMessageErrors.email.type) : null;

    return this.errors ? this.errors : null;
  }
}
