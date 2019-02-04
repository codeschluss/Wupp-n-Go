import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudGraph, CrudJoiner, CrudResolver } from '@portal/core';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { StrictHttpResponse } from 'src/api/strict-http-response';
import { ActivityProvider } from 'src/realm/activity/activity.provider';
import { ConfigurationModel } from 'src/realm/configuration/configuration.model';
import { ListComponent } from 'src/views/list.component';
import { ActivityModel } from '../../../realm/activity/activity.model';
import { CategoryModel } from '../../../realm/category/category.model';
import { SuburbModel } from '../../../realm/suburb/suburb.model';
import { TargetGroupModel } from '../../../realm/target-group/target-group.model';
import { MappingComponent } from '../mapping/mapping.component';


@Component({
  styleUrls: ['activity.list.component.css'],
  templateUrl: 'activity.list.component.html'
})

export class ActivityListComponent extends ListComponent implements OnInit {

  public static readonly imports = [
    MatSelectModule,
    MatFormFieldModule
  ];

  public activities: ActivityModel[];
  public suburbs: Observable<SuburbModel[]>;
  public categories: Observable<CategoryModel[]>;
  public target_groups: Observable<TargetGroupModel[]>;
  public showMap: boolean;
  private categoryFilter: string[] = [];

  @ViewChild(MappingComponent)
  private mapping: MappingComponent;

  private graph: CrudGraph = CrudJoiner.of(ActivityModel)
    .with('schedules')
    .with('category')
    .with('address').yield('suburb').graph;

  public suburbCtrl = new FormControl();
  public targetGroupCtrl = new FormControl();
  public mapConfigurations: ConfigurationModel[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityProvider: ActivityProvider,
    private crudResolver: CrudResolver
  ) {
    super();
  }

  ngOnInit(): void {
    this.mapConfigurations = this.route.snapshot.data.configurations;
    this.retrieveData();
    this.suburbs = this.route.snapshot.data.suburbs;
    this.target_groups = this.route.snapshot.data.targetGroups;
    this.categories = this.route.snapshot.data.categories;
    this.suburbCtrl.valueChanges.subscribe(() => this.updateFilterResults());
    this.targetGroupCtrl.valueChanges.subscribe(() =>
      this.updateFilterResults());
  }

  public updateFilterResults() {
    this.pageNumber = 0;
    this.showMap = false;
    this.activities = null;
    this.retrieveData();
  }

  public retrieveData() {
    // this.basic();
    this.complex();
  }

  private isActiveCategory(id: string): boolean {
    return this.categoryFilter.find(item => item === id) ? true : false;
  }

  // private basic(): void {
  //   this.activityProvider.readAll({
  //     embeddings: CrudJoiner.to(this.graph),
  //     page: this.pageNumber,
  //     size: this.pageSize,
  //     sort: 'name',
  //     categories: this.categoryFilter,
  //     targetgroups: this.targetGroupCtrl.value,
  //     suburbs: this.suburbCtrl.value,
  //     current: true
  //   }).pipe(mergeMap(
  //     (acts: any) => this.crudResolver.refine(acts, this.graph))
  //   ).subscribe((acts: any) => { }, () => {
  //     console.log('nothing found');
  //   });
  // }

  private complex(): void {
    const provider = this.activityProvider.system;
    provider.call(provider.methods.readAll, {
      embeddings: CrudJoiner.to(this.graph),
      page: this.pageNumber,
      size: this.pageSize,
      sort: 'name',
      categories: this.categoryFilter,
      targetgroups: this.targetGroupCtrl.value,
      suburbs: this.suburbCtrl.value,
      current: true
    }).pipe(
      tap((response) => this.intercept(response as any)),
      map((response) => provider.cast(response)),
      mergeMap((acts: any) => this.crudResolver.refine(acts, this.graph))
    ).subscribe((acts: any) =>
      this.activities = acts,
      () => this.activities = []);
  }

  public toggleCategoryFilter(id: string) {
    if (this.categoryFilter.find(item => item === id)) {
      this.removeFromCategoryFilter(id);
    } else {
      this.categoryFilter.push(id);
    }
    this.updateFilterResults();
  }

  public removeFromCategoryFilter(id: string) {
    if (this.categoryFilter.length === 1) {
      this.categoryFilter = [];
    } else {
      this.categoryFilter = this.categoryFilter.filter(itemID => itemID !== id);
    }
  }

  private intercept(response: StrictHttpResponse<any>) {
    this.totalPages = response.body.page.totalPages;
    this.pageNumber = response.body.page.number;
    this.pageSize = response.body.page.size;
  }

  nextPage(): void {
    this.showMap = false;
    this.activities = null;
    this.pageNumber++;
    this.retrieveData();
  }

  previousPage(): void {
    this.showMap = false;
    this.activities = null;
    this.pageNumber--;
    this.retrieveData();
  }

  // Map related methods:

  navigateToMap(): void {
    this.router.navigate(['/list/activities/map']);
  }

  showOnMap(activity: any): void {
    if (this.mapping && this.mapping.activities) {
      this.mapping.highlightPin(activity);
    }
  }

  resetHighlighting(): void {
    if (this.mapping) {
      this.mapping.unHighlightPins();
    }
  }

}
