import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { BaseStepper, FormStep } from '@wooportal/forms';
import { BlogModel } from '../../../realm/models/blog.model';
import { BlogFormComponent } from '../forms/blog.form';
import { TranslationFormComponent } from '../forms/translation.form';

@Component({
  selector: 'blog-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n i18n="@@createBlog">createBlog</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n i18n="@@editBlog">editBlog</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'main'">
          <i18n i18n="@@main">main</i18n>
        </ng-container>

        <ng-container *ngSwitchCase="'translations'">
          <i18n i18n="@@translations">translations</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class BlogStepperComponent
  extends BaseStepper<BlogModel> {

  public root: string = 'blogs';

  public steps: FormStep[] = [
    {
      name: 'main',
      form: BlogFormComponent
    },
    {
      name: 'translations',
      form: TranslationFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(BlogModel)
    .with('activity')
    .with('translations').yield('language');

  protected model: Type<BlogModel> = BlogModel;

  public get title(): string {
    const data = this.route.snapshot.routeConfig.children[0].data;
    return data.form && data.form.group.get('title').value;
  }

}
