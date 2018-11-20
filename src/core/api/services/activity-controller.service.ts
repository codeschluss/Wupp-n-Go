/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ActivityEntity } from '../models/activity-entity';
import { ResourceActivityEntity } from '../models/resource-activity-entity';
import { ScheduleEntity } from '../models/schedule-entity';
import { TagEntity } from '../models/tag-entity';

/**
 * Activity Controller
 */
@Injectable({
  providedIn: 'root',
})
class ActivityControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `ActivityControllerService.ActivityControllerFindAllParams` containing the following parameters:
   *
   * - `page`:
   *
   * - `size`:
   *
   * - `sort`:
   *
   * - `dir`:
   *
   * - `filter`:
   *
   * - `current`:
   *
   * @return OK
   */
  activityControllerFindAllResponse(params: ActivityControllerService.ActivityControllerFindAllParams): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.dir != null) __params = __params.set('dir', params.dir.toString());
    if (params.filter != null) __params = __params.set('filter', params.filter.toString());
    if (params.current != null) __params = __params.set('current', params.current.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param params The `ActivityControllerService.ActivityControllerFindAllParams` containing the following parameters:
   *
   * - `page`:
   *
   * - `size`:
   *
   * - `sort`:
   *
   * - `dir`:
   *
   * - `filter`:
   *
   * - `current`:
   *
   * @return OK
   */
  activityControllerFindAll(params: ActivityControllerService.ActivityControllerFindAllParams): Observable<{}> {
    return this.activityControllerFindAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param newActivity newActivity
   * @return OK
   */
  activityControllerAddResponse(newActivity: ActivityEntity): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newActivity;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/activities`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param newActivity newActivity
   * @return OK
   */
  activityControllerAdd(newActivity: ActivityEntity): Observable<{}> {
    return this.activityControllerAddResponse(newActivity).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerFindOneResponse(activityId: string): Observable<StrictHttpResponse<ResourceActivityEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${activityId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<ResourceActivityEntity>;
      })
    );
  }
  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerFindOne(activityId: string): Observable<ResourceActivityEntity> {
    return this.activityControllerFindOneResponse(activityId).pipe(
      __map(_r => _r.body as ResourceActivityEntity)
    );
  }

  /**
   * @param newActivity newActivity
   * @param activityId activityId
   * @return OK
   */
  activityControllerUpdateResponse(newActivity: ActivityEntity,
    activityId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newActivity;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/activities/${activityId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param newActivity newActivity
   * @param activityId activityId
   * @return OK
   */
  activityControllerUpdate(newActivity: ActivityEntity,
    activityId: string): Observable<{}> {
    return this.activityControllerUpdateResponse(newActivity, activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerDeleteResponse(activityId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/activities/${activityId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerDelete(activityId: string): Observable<{}> {
    return this.activityControllerDeleteResponse(activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerFindAddressResponse(activityId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${activityId}/address`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerFindAddress(activityId: string): Observable<{}> {
    return this.activityControllerFindAddressResponse(activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @param addressId addressId
   * @return OK
   */
  activityControllerUpdateAddressResponse(activityId: string,
    addressId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = addressId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/activities/${activityId}/address`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param activityId activityId
   * @param addressId addressId
   * @return OK
   */
  activityControllerUpdateAddress(activityId: string,
    addressId: string): Observable<{}> {
    return this.activityControllerUpdateAddressResponse(activityId, addressId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerFindCategoryResponse(activityId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${activityId}/category`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerFindCategory(activityId: string): Observable<{}> {
    return this.activityControllerFindCategoryResponse(activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @param categoryId categoryId
   * @return OK
   */
  activityControllerUpdateCategoryResponse(activityId: string,
    categoryId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = categoryId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/activities/${activityId}/category`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param activityId activityId
   * @param categoryId categoryId
   * @return OK
   */
  activityControllerUpdateCategory(activityId: string,
    categoryId: string): Observable<{}> {
    return this.activityControllerUpdateCategoryResponse(activityId, categoryId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerFindOrganisationResponse(activityId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${activityId}/organisation`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerFindOrganisation(activityId: string): Observable<{}> {
    return this.activityControllerFindOrganisationResponse(activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @param organisationId organisationId
   * @return OK
   */
  activityControllerUpdateOrganisationResponse(activityId: string,
    organisationId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = organisationId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/activities/${activityId}/organisation`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param activityId activityId
   * @param organisationId organisationId
   * @return OK
   */
  activityControllerUpdateOrganisation(activityId: string,
    organisationId: string): Observable<{}> {
    return this.activityControllerUpdateOrganisationResponse(activityId, organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerFindSchedulesResponse(activityId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${activityId}/schedules`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerFindSchedules(activityId: string): Observable<{}> {
    return this.activityControllerFindSchedulesResponse(activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @param schedules schedules
   * @return OK
   */
  activityControllerAddSchedulesResponse(activityId: string,
    schedules: Array<ScheduleEntity>): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = schedules;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/activities/${activityId}/schedules`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param activityId activityId
   * @param schedules schedules
   * @return OK
   */
  activityControllerAddSchedules(activityId: string,
    schedules: Array<ScheduleEntity>): Observable<{}> {
    return this.activityControllerAddSchedulesResponse(activityId, schedules).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @param scheduleId scheduleId
   * @return OK
   */
  activityControllerDeleteSchedulesResponse(activityId: string,
    scheduleId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/activities/${activityId}/schedules/${scheduleId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param activityId activityId
   * @param scheduleId scheduleId
   * @return OK
   */
  activityControllerDeleteSchedules(activityId: string,
    scheduleId: string): Observable<{}> {
    return this.activityControllerDeleteSchedulesResponse(activityId, scheduleId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerFindTagsResponse(activityId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${activityId}/tags`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerFindTags(activityId: string): Observable<{}> {
    return this.activityControllerFindTagsResponse(activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @param tags tags
   * @return OK
   */
  activityControllerAddTagsResponse(activityId: string,
    tags: Array<TagEntity>): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = tags;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/activities/${activityId}/tags`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param activityId activityId
   * @param tags tags
   * @return OK
   */
  activityControllerAddTags(activityId: string,
    tags: Array<TagEntity>): Observable<{}> {
    return this.activityControllerAddTagsResponse(activityId, tags).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @param tagId tagId
   * @return OK
   */
  activityControllerDeleteTagsResponse(activityId: string,
    tagId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/activities/${activityId}/tags/${tagId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param activityId activityId
   * @param tagId tagId
   * @return OK
   */
  activityControllerDeleteTags(activityId: string,
    tagId: string): Observable<{}> {
    return this.activityControllerDeleteTagsResponse(activityId, tagId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerFindTargetGroupsResponse(activityId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${activityId}/targetgroups`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerFindTargetGroups(activityId: string): Observable<{}> {
    return this.activityControllerFindTargetGroupsResponse(activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @param targetGroupIds targetGroupIds
   * @return OK
   */
  activityControllerAddTargetGroupsResponse(activityId: string,
    targetGroupIds: Array<string>): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = targetGroupIds;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/activities/${activityId}/targetgroups`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param activityId activityId
   * @param targetGroupIds targetGroupIds
   * @return OK
   */
  activityControllerAddTargetGroups(activityId: string,
    targetGroupIds: Array<string>): Observable<{}> {
    return this.activityControllerAddTargetGroupsResponse(activityId, targetGroupIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @param targetGroupId targetGroupId
   * @return OK
   */
  activityControllerDeleteTargetGroupsResponse(activityId: string,
    targetGroupId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/activities/${activityId}/targetgroups/${targetGroupId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param activityId activityId
   * @param targetGroupId targetGroupId
   * @return OK
   */
  activityControllerDeleteTargetGroups(activityId: string,
    targetGroupId: string): Observable<{}> {
    return this.activityControllerDeleteTargetGroupsResponse(activityId, targetGroupId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerFindUserResponse(activityId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${activityId}/user`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerFindUser(activityId: string): Observable<{}> {
    return this.activityControllerFindUserResponse(activityId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module ActivityControllerService {

  /**
   * Parameters for activityControllerFindAll
   */
  export interface ActivityControllerFindAllParams {
    page?: number;
    size?: number;
    sort?: string;
    dir?: string;
    filter?: string;
    current?: boolean;
  }
}

export { ActivityControllerService }
