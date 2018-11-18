import { UserEntity } from '../api/models/user-entity';
import { BaseModel } from '../base/base.model';
import { ActivityModel } from './activity.model';
import { OrganisationModel } from './organisation.model';

export class UserModel
  extends BaseModel implements UserEntity {

  public fullname: string;
  public password: string;
  public phone: string;
  public superuser: boolean;
  public username: string;

  public activities: Promise<ActivityModel[]>;
  public organisations: Promise<OrganisationModel[]>;

}