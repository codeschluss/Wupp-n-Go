import { Component } from '@angular/core';
import { OrganisationModel } from 'src/realm/organisation/organisation.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  styleUrls: ['organisation.component.scss'],
  templateUrl: 'organisation.list.component.html'
})

export class OrganisationListComponent {

  public static readonly imports = [];
  public organisations: OrganisationModel[] = [];

  constructor(
    route: ActivatedRoute
  ) {
    this.organisations = route.snapshot.data.organisations;

  }
}