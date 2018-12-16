import { Component, Type } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm, BooleanFieldComponent, FormField, StringFieldComponent } from '@portal/forms';
import { LanguageModel } from './language.model';

@Component({
  selector: 'language-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'locale'" i18n="@@locale">locale</i18n>
        <i18n *ngSwitchCase="'machineTranslated'"
          i18n="@@machineTranslated">machineTranslated</i18n>
        <i18n *ngSwitchCase="'name'" i18n="@@name">name</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class LanguageFormComponent extends BaseForm<LanguageModel> {

  public fields: FormField[] = [
    {
      name: 'name',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'locale',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'machineTranslated',
      input: BooleanFieldComponent
    }
  ];

  public model: Type<LanguageModel> = LanguageModel;

  public constructor(
    protected builder: FormBuilder,
    protected route: ActivatedRoute
  ) {
    super();
  }

}
