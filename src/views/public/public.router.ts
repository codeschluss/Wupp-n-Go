import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './layout/about.component';
import { ActivityListComponent } from './activity/activity.list.component';
import { ActivityViewComponent } from './activity/activity.view.component';
import { LayoutComponent } from '../layout/layout.component';
import { OrganisationListComponent } from './organisation/organisation.list.component';
import { OrganisationViewComponent } from './organisation/organisation.view.component';
import { BlogListComponent } from './blog/blog.list.component';
import { SearchResultListComponent } from './search/searchresult.list.component';
import { BlogViewComponent } from './blog/blog.view.component';
import { CrudResolver, CrudJoiner } from '@portal/core';
import { ActivityModel } from 'src/realm/activity/activity.model';
import { CategoryModel } from 'src/realm/category/category.model';
import { OrganisationModel } from 'src/realm/organisation/organisation.model';
import { TagModel } from 'src/realm/tag/tag.model';
import { TargetGroupModel } from 'src/realm/target-group/target-group.model';
import { AddressModel } from 'src/realm/address/address.model';
import { SuburbModel } from 'src/realm/suburb/suburb.model';
import { ScheduleModel } from 'src/realm/schedule/schedule.model';
import { OrganisationImageModel } from 'src/realm/image/organisation-image.model';

const PublicProviders = [
];

const PublicResolvers = {
};

const PublicRoutes = [
  {
    path: 'home',
    component: AboutComponent,
    resolve: {
      activities: CrudResolver
    },
    data: {
      activities: CrudJoiner.of(ActivityModel)
        .with(CategoryModel)
        .with(AddressModel).yield(SuburbModel)
        .with(ScheduleModel)
    }
  },
  {
    path: 'list/activities',
    children: [
      {
        path: '',
        component: ActivityListComponent,
        resolve: {
          activities: CrudResolver,
          targetGroups: CrudResolver,
          categories: CrudResolver,
          suburbs: CrudResolver
        },
        data: {
          activities: CrudJoiner.of(ActivityModel)
            .with(CategoryModel)
            .with(AddressModel).yield(SuburbModel)
            .with(ScheduleModel),
          targetGroups: CrudJoiner.of(TargetGroupModel),
          categories: CrudJoiner.of(CategoryModel),
          suburbs: CrudJoiner.of(SuburbModel)
        }
      }
    ]
  },
  {
    path: 'view/activities/:uuid',
    component: ActivityViewComponent,
    resolve: {
      activity: CrudResolver
    },
    data: {
      activity: CrudJoiner.of(ActivityModel)
        .with(CategoryModel)
        .with(OrganisationModel)
        .with(TargetGroupModel)
        .with(ScheduleModel)
        .with(AddressModel).yield(SuburbModel)
    }
  },
  {
  path: 'list/organisations',
  children: [
      {
        path: '',
        component: OrganisationListComponent,
        resolve: {
          organisations: CrudResolver
        },
        data: {
          organisations: CrudJoiner.of(OrganisationModel)
            .with(AddressModel).yield(SuburbModel)
        }
      }
    ]
  },
  {
    path: 'view/organisations/:uuid',
    component: OrganisationViewComponent,
    resolve: {
      organisation: CrudResolver
    },
    data: {
      organisation: CrudJoiner.of(OrganisationModel)
        .with(AddressModel).yield(SuburbModel)
        .with(ActivityModel)
        .with(OrganisationImageModel)
    }
  },
  {
    path: 'list/blogs',
    children: [
      {
        path: '/',
        component: BlogListComponent,
      },
      {
        path: '',
        component: BlogListComponent,
      }
    ]
  },
  {
    path: 'view/blogs/:id',
    component: BlogViewComponent
  },
  {
    path: 'search',
    children: [
      {
        path: ':query',
        component: SearchResultListComponent,
      },
      {
        path: '',
        component: SearchResultListComponent
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([{
    path: '',
    children: PublicRoutes,
    resolve: PublicResolvers,
    component: LayoutComponent
  }])],
  providers: PublicProviders
})

export class PublicRouter { }
