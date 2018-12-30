import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseTable, TableColumn } from '@portal/forms';
import { ActivityModel } from './activity.model';

@Component({
  selector: 'activity-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'category'" i18n="@@category">category</i18n>
        <i18n *ngSwitchCase="'contactName'"
          i18n="@@contactName">contactName</i18n>
        <i18n *ngSwitchCase="'name'" i18n="@@title">title</i18n>
        <i18n *ngSwitchCase="'organisation'"
          i18n="@@organisation">organisation</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class ActivityTableComponent extends BaseTable<ActivityModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      sort: true,
      value: (item) => item.name
    },
    {
      name: 'contactName',
      sort: true,
      value: (item) => item.contactName
    },
    {
      name: 'organisation',
      sort: true,
      value: (item) => item.provider.organisation.name
    },
    {
      name: 'category',
      sort: true,
      value: (item) => item.category.name
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(ActivityModel)
    .with('category')
    .with('provider').yield('organisation');

  protected model: Type<ActivityModel> = ActivityModel;

}
