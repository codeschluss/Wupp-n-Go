import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm, ChipListFieldComponent, FormField, SelectFieldComponent, StringFieldComponent } from '@portal/forms';
import { CategoryModel } from '../category/category.model';
import { OrganisationModel } from '../organisation/organisation.model';
import { TagModel } from '../tag/tag.model';
import { TargetGroupModel } from '../target-group/target-group.model';
import { ActivityModel } from './activity.model';
import { ActivityProvider } from './activity.provider';

@Component({
  selector: 'activity-form',
  template: BaseForm.template(`
    <i18n #name i18n="@@title">title</i18n>
    <i18n #description i18n="@@description">description</i18n>
    <i18n #contactName i18n="@@contactName">contactName</i18n>
    <i18n #phone i18n="@@phone">phone</i18n>
    <i18n #mail i18n="@@mail">mail</i18n>
    <i18n #organisation i18n="@@organisation">organisation</i18n>
    <i18n #category i18n="@@category">category</i18n>
    <i18n #targetGroups i18n="@@targetGroups">targetGroups</i18n>
    <i18n #tags i18n="@@tags">tags</i18n>
  `)
})

export class ActivityFormComponent extends BaseForm<ActivityModel> {

  public fields: FormField[] = [
    {
      name: 'name',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'description',
      input: StringFieldComponent,
      multi: true,
      tests: [Validators.required]
    },
    {
      name: 'contactName',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'phone',
      input: StringFieldComponent
    },
    {
      name: 'mail',
      input: StringFieldComponent
    },
    {
      name: 'organisation',
      input: SelectFieldComponent,
      model: OrganisationModel,
      tests: [Validators.required]
    },
    {
      name: 'category',
      input: SelectFieldComponent,
      model: CategoryModel,
      tests: [Validators.required]
    },
    {
      name: 'targetGroups',
      input: SelectFieldComponent,
      model: TargetGroupModel,
      multi: true
    },
    {
      name: 'tags',
      input: ChipListFieldComponent,
      model: TagModel
    }
  ];

  public model = ActivityModel;

  public constructor(
    protected builder: FormBuilder,
    protected provider: ActivityProvider,
    protected route: ActivatedRoute
  ) {
    super();
  }

  protected ngPostInit(): void {
    const options = this.route.snapshot.data.session.accessToken
      .approvedOrgas.map((id) => this.route.snapshot.data.organisation
        .find((organisation) => organisation.id === id));

    this.fields[this.fields.findIndex((field) =>
        field.name === 'organisation')].options = options;
  }

}
