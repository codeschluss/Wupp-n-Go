import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityModel } from 'src/realm/activity/activity.model';
import { ActivityStepperComponent } from 'src/realm/activity/activity.stepper';
import { ConfigurationModel } from 'src/realm/configuration/configuration.model';
import { OrganisationModel } from 'src/realm/organisation/organisation.model';
import { UserModel } from 'src/realm/user/user.model';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { CrudResolver, CrudJoiner } from '@portal/core';

const AdminResolvers = [];


const routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    resolve: {
      organisations: CrudResolver
    },
    data: {
      organisations: CrudJoiner.of(OrganisationModel)
    }
  },
  // {
  //   path: 'account',
  //   canActivate: ['UserGuard'],
  //   component: 'AccountDeckComponent',
  //   children: [
  //     {
  //       path: '',
  //       component: 'AccountFormComponent'
  //     },
  //     {
  //       path: 'activities',
  //       canActivate: ['OrganisationUserGuard'],
  //       component: 'ActivityListComponent'
  //     },
  //     {
  //       path: 'organisations',
  //       component: 'OrganisationListComponent'
  //     }
  //   ]
  // },
  // {
  //   path: 'organisations',
  //   canActivate: ['OrganisationAdminGuard', 'SuperUserGuard'],
  //   component: 'ContentDeckComponent',
  //   children: [
  //     {
  //       path: '',
  //       component: 'OrganisationListComponent'
  //     },
  //     {
  //       path: 'activities',
  //       component: 'ActivityListComponent'
  //     },
  //     {
  //       path: 'providers',
  //       component: 'ProviderListComponent'
  //     },
  //     {
  //       path: 'requests',
  //       component: 'RequestListComponent'
  //     }
  //   ]
  // },
  // {
  //   path: 'application',
  //   canActivate: ['SuperUserGuard'],
  //   component: 'PortalDeckComponent',
  //   children: [
  //     {
  //       path: 'addresses',
  //       component: 'AddressListComponent'
  //     },
  //     {
  //       path: 'configuration',
  //       component: 'ConfigurationFormComponent'
  //     },
  //     {
  //       path: 'categories',
  //       component: 'CategoryListComponent'
  //     },
  //     {
  //       path: 'keywords',
  //       component: 'KeywordsListComponent'
  //     },
  //     {
  //       path: 'suburbs',
  //       component: 'SuburbListComponent'
  //     },
  //     {
  //       path: 'targetgroups',
  //       component: 'TargetGroupListComponent'
  //     },
  //     {
  //       path: 'translations',
  //       component: 'TranslationsListComponent'
  //     }
  //   ]
  // }
];

const AdminProviders = [
];

const AdminRoutes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [],
    children: routes
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(AdminRoutes)],
  providers: AdminProviders

})

export class AdminRouter { }