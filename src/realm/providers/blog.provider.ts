import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@wooportal/core';
import { EMPTY, Observable } from 'rxjs';
import { StringPrimitive as String } from '../../api/models/string-primitive';
import { BlogControllerService } from '../../api/services/blog-controller.service';
import { ActivityModel } from '../models/activity.model';
import { BlogModel } from '../models/blog.model';
import { LanguageModel } from '../models/language.model';

@Injectable({ providedIn: 'root' })
export class BlogProvider
  extends CrudProvider<BlogControllerService, BlogModel> {

  protected linked: CrudLink[] = [
    {
      field: 'activity',
      method: this.service.blogControllerReadActivityResponse,
      model: ActivityModel
    },
    {
      field: 'language',
      method: () => EMPTY,
      model: LanguageModel
    },
    {
      field: 'translations',
      method: this.service.blogControllerReadTranslationsResponse,
      model: BlogModel
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.blogControllerCreateResponse,
    delete: this.service.blogControllerDeleteResponse,
    readAll: this.service.blogControllerReadAllResponse,
    readOne: this.service.blogControllerReadOneResponse,
    update: this.service.blogControllerUpdateResponse
  };

  protected model: Type<BlogModel> = this.based(BlogModel);

  public constructor(
    protected service: BlogControllerService
  ) {
    super();
  }

  public create: (model: BlogModel) => Observable<any>;

  public update: (model: BlogModel) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<BlogModel>;

  public readAll: (params?: BlogControllerService
    .BlogControllerReadAllParams) => Observable<BlogModel[]>;

  public relinkActivity:
    (id: string, activityId: String) => Observable<any> =
      this.apply(this.service.blogControllerUpdateActivityResponse);

}