import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { BaseStepper, FormStep } from '@wooportal/forms';
import { PageModel } from '../../../realm/models/page.model';
import { PageFormComponent } from '../forms/page.form';
import { TranslationFormComponent } from '../forms/translation.form';

@Component({
  selector: 'page-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n i18n="@@createPage">createPage</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n i18n="@@editPage">editPage</i18n>
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

export class PageStepperComponent
  extends BaseStepper<PageModel> {

  public root: string = 'pages';

  public steps: FormStep[] = [
    {
      name: 'main',
      form: PageFormComponent,
    },
    {
      name: 'translations',
      form: TranslationFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(PageModel)
    .with('topic')
    .with('translations').yield('language');

  protected model: Type<PageModel> = PageModel;

  public get title(): string {
    const data = this.route.snapshot.routeConfig.children[0].data;
    return data.form && data.form.group.get('title').value;
  }

}
