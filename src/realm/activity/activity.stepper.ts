import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudJoiner } from '@portal/core';
import { BaseStepper } from '@portal/forms';
import { AddressFormComponent } from '../address/address.form';
import { AddressModel } from '../address/address.model';
import { CategoryModel } from '../category/category.model';
import { OrganisationModel } from '../organisation/organisation.model';
import { ScheduleModel } from '../schedule/schedule.model';
import { SuburbModel } from '../suburb/suburb.model';
import { TagModel } from '../tag/tag.model';
import { TargetGroupModel } from '../target-group/target-group.model';
import { ActivityFormComponent } from './activity.form';
import { ActivityModel } from './activity.model';

@Component({
  selector: 'activity-stepper',
  template: BaseStepper.template(`
    <ng-container *ngIf="true; then new"></ng-container>

    <ng-template #name>
      {{ route.snapshot.data[root].name }}
    </ng-template>
    <ng-template #new>
      <i18n i18n="@@newActivity">newActivity</i18n>
    </ng-template>
  `)
})

export class ActivityStepperComponent extends BaseStepper<ActivityModel> {

  public root = 'activity';

  public steps = [
    {
      field: this.root,
      form: ActivityFormComponent
    },
    {
      field: 'address',
      form: AddressFormComponent
    }
  ];

  protected joiner = CrudJoiner.of(ActivityModel)
    .with(AddressModel).yield(SuburbModel)
    .with(CategoryModel)
    .with(OrganisationModel).yield(AddressModel).yield(SuburbModel)
    .with(ScheduleModel)
    .with(TagModel)
    .with(TargetGroupModel);

  protected model = ActivityModel;

  public constructor(
    protected route: ActivatedRoute,
    protected router: Router
  ) {
    super();
  }

}
