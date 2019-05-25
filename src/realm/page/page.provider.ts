import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@wooportal/core';
import { EMPTY, Observable } from 'rxjs';
import { PageControllerService } from 'src/api/services/page-controller.service';
import { StringPrimitive as String } from '../../api/models/string-primitive';
import { LanguageModel } from '../language/language.model';
import { TopicModel } from '../topic/topic.model';
import { PageModel } from './page.model';

@Injectable({ providedIn: 'root' })
export class PageProvider
  extends CrudProvider<PageControllerService, PageModel> {

  protected linked: CrudLink[] = [
    {
      field: 'language',
      method: () => EMPTY,
      model: LanguageModel
    },
    {
      field: 'topic',
      method: this.service.pageControllerReadTopicResponse,
      model: TopicModel
    },
    {
      field: 'translations',
      method: this.service.pageControllerReadTranslationsResponse,
      model: PageModel
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.pageControllerCreateResponse,
    delete: this.service.pageControllerDeleteResponse,
    readAll: this.service.pageControllerReadAllResponse,
    readOne: this.service.pageControllerReadOneResponse,
    update: this.service.pageControllerUpdateResponse
  };

  protected model: Type<PageModel> = this.based(PageModel);

  public constructor(
    protected service: PageControllerService
  ) {
    super();
  }

  public create: (model: PageModel) => Observable<any>;

  public update: (model: PageModel) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<PageModel>;

  public readAll: (params?: PageControllerService
    .PageControllerReadAllParams) => Observable<PageModel[]>;

  public relinkTopic:
    (id: string, topicId: String) => Observable<any> =
      this.apply(this.service.pageControllerUpdateTopicResponse);

}
