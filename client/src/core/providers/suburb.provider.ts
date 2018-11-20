import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SuburbControllerService } from '../api/services/suburb-controller.service';
import { BaseProvider } from '../base/base.provider';
import { SuburbModel } from '../models/suburb.model';

@Injectable({ providedIn: 'root' })
export class SuburbProvider
  extends BaseProvider<SuburbControllerService, SuburbModel> {

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
  ) { super(); }

}
