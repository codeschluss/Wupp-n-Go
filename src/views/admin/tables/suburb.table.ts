import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { BaseTable, TableColumn } from '@wooportal/forms';
import { SuburbModel } from '../../../realm/models/suburb.model';

@Component({
  selector: 'suburb-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@name">name</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class SuburbTableComponent extends BaseTable<SuburbModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      value: (item) => item.name
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(SuburbModel);

  protected model: Type<SuburbModel> = SuburbModel;

}
