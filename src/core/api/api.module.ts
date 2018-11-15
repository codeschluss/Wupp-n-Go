/* tslint:disable */
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

import { ActivityControllerService } from './services/activity-controller.service';
import { AddressControllerService } from './services/address-controller.service';
import { CategoryControllerService } from './services/category-controller.service';
import { ConfigurationControllerService } from './services/configuration-controller.service';
import { OrganisationControllerService } from './services/organisation-controller.service';
import { SuburbControllerService } from './services/suburb-controller.service';
import { TagControllerService } from './services/tag-controller.service';
import { TargetGroupControllerService } from './services/target-group-controller.service';
import { UserControllerService } from './services/user-controller.service';

/**
 * Provider for all api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    ActivityControllerService,
    AddressControllerService,
    CategoryControllerService,
    ConfigurationControllerService,
    OrganisationControllerService,
    SuburbControllerService,
    TagControllerService,
    TargetGroupControllerService,
    UserControllerService
  ],
})
export class ApiModule { }
