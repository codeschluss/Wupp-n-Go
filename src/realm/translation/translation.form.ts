import { Component, Type } from '@angular/core';
import { BaseForm, FormField } from '@portal/forms';
import { Observable, of } from 'rxjs';
import { TranslationModel } from './translation.model';

@Component({
  selector: 'translation-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
      </ng-container>
    </ng-template>
  `)
})

export class TranslationFormComponent extends BaseForm<TranslationModel> {

  public fields: FormField[] = [];

  public model: Type<TranslationModel> = TranslationModel;

  protected persist(item: TranslationModel = this.item): Observable<any> {
    return of(item);
  }

}
