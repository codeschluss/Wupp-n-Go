import { CrudModel } from '@portal/core';
import { Observable } from 'rxjs';
import { OrganisationEntity } from '../../api/models/organisation-entity';
import { ActivityModel } from '../activity/activity.model';
import { AddressModel } from '../address/address.model';
import { ImageModel } from '../image/image.model';
import { ProviderModel } from '../provider/provider.model';
import { UserModel } from '../user/user.model';

export class OrganisationModel
  extends CrudModel implements OrganisationEntity {

  public approved: boolean;
  public description: string;
  public mail: string;
  public name: string;
  public phone: string;
  public videoUrl: string;
  public website: string;

  public addressId: string;

  public activities: Observable<ActivityModel[]>;
  public address: Observable<AddressModel>;
  public images: Observable<ImageModel[]>;
  public providers: Observable<ProviderModel[]>;
  public users: Observable<UserModel[]>;

}
