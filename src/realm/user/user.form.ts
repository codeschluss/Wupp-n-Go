import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseForm, FormField, StringFieldComponent } from '@portal/forms';
import { UserModel } from './user.model';

@Component({
  selector: 'user-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'name'" i18n="@@name">name</i18n>
        <i18n *ngSwitchCase="'phone'" i18n="@@phone">phone</i18n>
        <i18n *ngSwitchCase="'password'" i18n="@@password">password</i18n>
        <i18n *ngSwitchCase="'passwordConfirm'"
          i18n="@@passwordConfifm">passwordConfirm</i18n>
        <i18n *ngSwitchCase="'username'" i18n="@@username">username</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class UserFormComponent extends BaseForm<UserModel> {

  public fields: FormField[] = [
    {
      name: 'name',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'username',
      input: StringFieldComponent,
      tests: [Validators.required, Validators.email],
      type: 'email'
    },
    {
      name: 'phone',
      input: StringFieldComponent,
      tests: [Validators.required],
      type: 'tel'
    },
    {
      name: 'password',
      input: StringFieldComponent,
      tests: [Validators.minLength(12)],
      type: 'password'
    },
    {
      name: 'passwordConfirm',
      input: StringFieldComponent,
      tests: [Validators.minLength(12)],
      type: 'password'
    }
  ];

  public model: Type<UserModel> = UserModel;

}
