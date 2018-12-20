import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CrudJoiner, CrudResolver, Selfroute, TokenResolver } from '@portal/core';
import { OrganisationModel } from '../../../realm/organisation/organisation.model';
import { UserModel } from '../../../realm/user/user.model';
import { ClientPackage } from '../../../utils/package';

@Component({
  templateUrl: './account.panel.html'
})

export class AccountPanelComponent extends Selfroute implements OnInit {

  public user: UserModel;

  protected routing: Route = {
    path: 'account/:uuid',
    component: AccountPanelComponent,
    resolve: {
      tokens: TokenResolver,
      user: CrudResolver
    },
    data: {
      user: CrudJoiner.of(UserModel)
        .with('activities').yield('category')
        .with('activities').yield('provider').yield('organisation')
        .with('organisations').yield('address').yield('suburb')
    }
  };

  public constructor(
    private route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.user = this.route.snapshot.data.user;
  }

    public isAdmin(item: OrganisationModel): boolean {
    const claim = ClientPackage.config.jwtClaims.organisationAdmin;
    return this.route.snapshot.data.tokens.access[claim].includes(item.id);
  }

  public isApproved(item: OrganisationModel): boolean {
    const claim = ClientPackage.config.jwtClaims.organisationUser;
    return this.route.snapshot.data.tokens.access[claim].includes(item.id);
  }

}
