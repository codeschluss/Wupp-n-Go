import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SuburbControllerService } from '../api/services/suburb-controller.service';
import { CrudService } from '../crud/crud.provider';
import { SuburbModel } from '../models/suburb.model';

@Injectable({ providedIn: 'root' })
export class SuburbProvider
  extends CrudService<SuburbControllerService, SuburbModel> {

  public create: (model: SuburbModel) => Promise<any>;

  public update: (id: string, model: SuburbModel) => Promise<any>;

  public delete: (id: string) => Promise<any>;

  public findOne: (id: string) => Promise<SuburbModel>;

  public findAll: (params?: SuburbControllerService
    .SuburbControllerFindAllParams) => Promise<SuburbModel[]>;

  protected linked = [];

  protected methods = {
    create: this.service.suburbControllerAddResponse,
    delete: this.service.suburbControllerDeleteResponse,
    findAll: this.service.suburbControllerFindAllResponse,
    findOne: this.service.suburbControllerFindOneResponse,
    update: this.service.suburbControllerUpdateResponse
  };

  protected model = this.based(SuburbModel);

  public constructor(
    protected injector: Injector,
    protected service: SuburbControllerService,
    protected snackbar: MatSnackBar
  ) {
    super();
  }

}
