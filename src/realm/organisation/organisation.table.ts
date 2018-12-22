import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseTable, TableColumn } from '@portal/forms';
import { OrganisationModel } from './organisation.model';

@Component({
  selector: 'organisation-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'address'" i18n="@@address">address</i18n>
        <i18n *ngSwitchCase="'mail'" i18n="@@mail">mail</i18n>
        <i18n *ngSwitchCase="'name'" i18n="@@title">title</i18n>
        <i18n *ngSwitchCase="'phone'" i18n="@@phone">phone</i18n>
        <i18n *ngSwitchCase="'website'" i18n="@@website">website</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class OrganisationTableComponent extends BaseTable<OrganisationModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      sort: true,
      value: (item) => item.name
    },
    {
      name: 'website',
      sort: true,
      value: (item) => item.website
    },
    {
      name: 'mail',
      sort: true,
      value: (item) => item.mail
    },
    {
      name: 'phone',
      sort: true,
      value: (item) => item.phone
    },
    {
      name: 'address',
      // TODO: non-optional address
      value: (item) => item.address ? `
        ${item.address.street}
        ${item.address.houseNumber}
        ${item.address.postalCode}
        ${item.address.place}
        ${item.address.suburb.name}
      ` : ''
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(OrganisationModel)
    .with('address').yield('suburb');

  protected model: Type<OrganisationModel> = OrganisationModel;

}
