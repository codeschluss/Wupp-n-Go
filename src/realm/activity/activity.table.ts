import { Component, Type } from '@angular/core';
import { BaseTable } from '@portal/forms';
import { ActivityModel } from './activity.model';


@Component({
  template: BaseTable.template(`
    <ng-container matColumnDef="name">
      <mat-header-cell mat-sort-header *matHeaderCellDef>@@title</mat-header-cell>
      <mat-cell *matCellDef="let row">{{ row.name }}</mat-cell>
    </ng-container>

    <ng-container matColumnDef="description">
      <mat-header-cell mat-sort-header *matHeaderCellDef>@@description</mat-header-cell>
      <mat-cell *matCellDef="let row">{{ row.description }}</mat-cell>
    </ng-container>
  `)
})

export class ActivityTableComponent extends BaseTable<ActivityModel> {

  public columns = ['name', 'description'];

  protected model: Type<ActivityModel> = ActivityModel;

}
