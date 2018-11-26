import { Injectable, Injector } from '@angular/core';
import { OrganisationControllerService } from '../api/services/organisation-controller.service';
import { CrudProvider } from '../crud/crud.provider';
import { ActivityModel } from '../models/activity.model';
import { AddressModel } from '../models/address.model';
import { OrganisationModel } from '../models/organisation.model';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class OrganisationProvider
  extends CrudProvider<OrganisationControllerService, OrganisationModel> {

  protected linked = [
    {
      field: 'activities',
      method: this.service.organisationControllerFindActivitiesResponse,
      model: ActivityModel
    },
    {
      field: 'address',
      method: this.service.organisationControllerFindAddressResponse,
      model: AddressModel
    },
    {
      field: 'users',
      method: this.service.organisationControllerFindUsersResponse,
      model: UserModel
    }
  ];

  protected methods = {
    create: this.service.organisationControllerAddResponse,
    delete: this.service.organisationControllerDeleteResponse,
    findAll: this.service.organisationControllerFindAllResponse,
    findOne: this.service.organisationControllerFindOneResponse,
    update: this.service.organisationControllerUpdateResponse
  };

  protected model = this.based(OrganisationModel);

  public constructor(
    protected injector: Injector,
    protected service: OrganisationControllerService
  ) {
    super();
  }

  public create: (model: OrganisationModel) => Promise<any>;

  public update: (id: string, model: OrganisationModel) => Promise<any>;

  public delete: (id: string) => Promise<any>;

  public findOne: (id: string) => Promise<OrganisationModel>;

  public findAll: (params?: OrganisationControllerService
    .OrganisationControllerFindAllParams) => Promise<OrganisationModel[]>;

  public relinkAddress:
    (id: string, addressId: string) => Promise<any> =
      this.apply(this.service.organisationControllerUpdateAddressResponse);

  public unlinkActivity:
    (id: string, activityId: string) => Promise<any> =
      this.apply(this.service.organisationControllerDeleteActivityResponse);

  public unlinkUser:
    (id: string, userId: string) => Promise<any> =
      this.apply(this.service.organisationControllerDeleteUserResponse);

}