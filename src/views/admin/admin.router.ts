import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenResolver } from '@wooportal/core';
import { ActivityStepperComponent } from '../../realm/activity/activity.stepper';
import { AddressStepperComponent } from '../../realm/address/address.stepper';
import { BlogStepperComponent } from '../../realm/blog/blog.stepper';
import { CategoryStepperComponent } from '../../realm/category/category.stepper';
import { LanguageStepperComponent } from '../../realm/language/language.stepper';
import { OrganisationStepperComponent } from '../../realm/organisation/organisation.stepper';
import { PageStepperComponent } from '../../realm/page/page.stepper';
import { SuburbStepperComponent } from '../../realm/suburb/suburb.stepper';
import { TagStepperComponent } from '../../realm/tag/tag.stepper';
import { TargetGroupStepperComponent } from '../../realm/target-group/target-group.stepper';
import { TopicStepperComponent } from '../../realm/topic/topic.stepper';
import { UserStepperComponent } from '../../realm/user/user.stepper';
import { AdminComponent } from './admin.component';
import { AccountPanelComponent } from './panels/account/account.panel';
import { ApplicationPanelComponent } from './panels/application/application.panel';
import { OrganisationPanelComponent } from './panels/organisation/organisation.panel';
import { PositioningPanelComponent } from './panels/positioning/positioning.panel';
import { PrivilegesPanelComponent } from './panels/privileges/privileges.panel';

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([
    {
      path: '',
      component: AdminComponent,
      resolve: {
        tokens: TokenResolver
      },
      // canActivateChild: [AdminGuarding],
      children: [
        AccountPanelComponent.routing,
        ApplicationPanelComponent.routing,
        OrganisationPanelComponent.routing,
        PositioningPanelComponent.routing,
        PrivilegesPanelComponent.routing,
        {
          path: 'edit',
          children: [
            ActivityStepperComponent.routing,
            AddressStepperComponent.routing,
            BlogStepperComponent.routing,
            CategoryStepperComponent.routing,
            LanguageStepperComponent.routing,
            OrganisationStepperComponent.routing,
            PageStepperComponent.routing,
            SuburbStepperComponent.routing,
            TagStepperComponent.routing,
            TargetGroupStepperComponent.routing,
            TopicStepperComponent.routing,
            UserStepperComponent.routing
          ]
        }
      ]
    },
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: ''
    }
  ])]
})

export class AdminRouter { }
