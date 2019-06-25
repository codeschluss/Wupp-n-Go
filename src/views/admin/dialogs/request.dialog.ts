import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatSelectionListChange } from '@angular/material/list';
import { TokenProvider } from '@wooportal/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, mergeMap, startWith, take } from 'rxjs/operators';
import { OrganisationModel } from '../../../realm/models/organisation.model';
import { OrganisationProvider } from '../../../realm/providers/organisation.provider';
import { UserProvider } from '../../../realm/providers/user.provider';

@Component({
  styles: [`
    :host { display: block; max-width: 100%; width: 480px; }
    mat-form-field { width: 100%; }
  `],
  template: `
    <h1 mat-dialog-title>
      <i18n i18n="@@selectOrganisation">selectOrganisation</i18n>
    </h1>
    <section mat-dialog-content>
      <mat-form-field>
        <mat-label><i18n i18n="@@search">search</i18n></mat-label>
        <input matInput type="search">
      </mat-form-field>
      <mat-selection-list (selectionChange)="select($event)">
        <ng-container *ngFor="let item of items">
          <mat-list-option [value]="item.id">
            {{ item.name }}
          </mat-list-option>
        </ng-container>
      </mat-selection-list>
    </section>
    <section mat-dialog-actions>
      <button mat-button mat-dialog-close tabindex="-1">
        <i18n i18n="@@close">close</i18n>
      </button>
      <button mat-button
        color="primary"
        [disabled]="!ids.length"
        (click)="request()">
        <i18n i18n="@@joinOrganisations">joinOrganisations</i18n>
      </button>
    </section>
  `
})

export class RequestDialogComponent implements OnInit {

  public ids: string[] = [];

  public items: OrganisationModel[];

  @ViewChild(MatInput, { static: true })
  private search: MatInput;

  public constructor(
    private dialog: MatDialogRef<RequestDialogComponent>,
    private organisationProvider: OrganisationProvider,
    private tokenProvider: TokenProvider,
    private userProvider: UserProvider
  ) { }

  public ngOnInit(): void {
    this.search.stateChanges.pipe(
      map(() => this.search.value || null),
      debounceTime(1000),
      startWith(null),
      distinctUntilChanged(),
      mergeMap((label) => this.suggest(label)),
    ).subscribe((items) => this.items = items);
  }

  public request(): void {
    this.tokenProvider.value.pipe(take(1)).pipe(mergeMap((tokens) =>
      this.userProvider.linkOrganisations(tokens.access.id, this.ids))
    ).subscribe(() => this.dialog.close(true));
  }

  public select(event: MatSelectionListChange): void {
    this.ids.includes(event.option.value)
      ? this.ids.splice(this.ids.findIndex((i) => i === event.option.value), 1)
      : this.ids.push(event.option.value);
  }

  private suggest(label: string = ''): Observable<OrganisationModel[]> {
    return forkJoin([
      this.organisationProvider.readAll({ approved: true, filter: label }),
      this.tokenProvider.value.pipe(take(1))
    ]).pipe(
      map(([items, tokens]) => items.filter((item) =>
        !tokens.access.adminOrgas.includes(item.id) &&
        !tokens.access.approvedOrgas.includes(item.id)
      )),
      catchError(() => of([]))
    );
  }

}
