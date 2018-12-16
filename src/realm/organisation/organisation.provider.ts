import { Injectable } from '@angular/core';
import { CrudProvider } from '@portal/core';
import { Observable } from 'rxjs';
import { OrganisationControllerService } from '../../api/services/organisation-controller.service';
import { ActivityModel } from '../activity/activity.model';
import { AddressModel } from '../address/address.model';
import { OrganisationImageModel } from '../image/organisation-image.model';
import { ProviderModel } from '../provider/provider.model';
import { UserModel } from '../user/user.model';
import { OrganisationModel } from './organisation.model';

@Injectable({ providedIn: 'root' })
export class OrganisationProvider
  extends CrudProvider<OrganisationControllerService, OrganisationModel> {

  protected linked = [
    {
      field: 'activities',
      method: this.service.organisationControllerReadActivitiesResponse,
      model: ActivityModel
    },
    {
      field: 'address',
      method: this.service.organisationControllerReadAddressResponse,
      model: AddressModel
    },
    {
      field: 'images',
      method: this.service.organisationControllerReadImagesResponse,
      model: OrganisationImageModel
    },
    {
      field: 'providers',
      method: null,
      model: ProviderModel
    },
    {
      field: 'users',
      method: this.service.organisationControllerReadUsersResponse,
      model: UserModel
    }
  ];

  protected methods = {
    create: this.service.organisationControllerCreateResponse,
    delete: this.service.organisationControllerDeleteResponse,
    readAll: this.service.organisationControllerReadAllResponse,
    readOne: this.service.organisationControllerReadOneResponse,
    translate: this.service.organisationControllerReadTranslationsResponse,
    update: this.service.organisationControllerUpdateResponse
  };

  protected model = this.based(OrganisationModel);

  public constructor(
    protected service: OrganisationControllerService
  ) {
    super();
  }

  public create: (model: OrganisationModel) => Observable<any>;

  public update: (id: string, model: OrganisationModel) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<OrganisationModel>;

  public readAll: (params?: OrganisationControllerService
    .OrganisationControllerReadAllParams) => Observable<OrganisationModel[]>;

  public grantOrganisationAdmin:
    (id: string, userId: string, grant: boolean) => Observable<any> =
      this.apply(this.service.organisationControllerGrantAdminRightResponse);

  public grantOrganisationUser:
    (id: string, userId: string, grant: boolean) => Observable<any> =
    this.apply(this.service.organisationControllerApproveOrRejectUserResponse);

  public relinkAddress:
    (id: string, addressId: string) => Observable<any> =
      this.apply(this.service.organisationControllerUpdateAddressResponse);

  public unlinkActivity:
    (id: string, activityId: string) => Observable<any> =
      this.apply(this.service.organisationControllerDeleteActivityResponse);

  public unlinkUser:
    (id: string, userId: string) => Observable<any> =
      this.apply(this.service.organisationControllerDeleteUserResponse);

}
