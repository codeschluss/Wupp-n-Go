import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CorePackage, SessionProvider } from '@portal/core';
import { ActivityProvider } from '../../realm/activity/activity.provider';
import { OrganisationProvider } from '../../realm/organisation/organisation.provider';
import { UserProvider } from '../../realm/user/user.provider';
import { ClientPackage } from '../../utils/package';

@Component({
  template: `<router-outlet></router-outlet>`
})

export class AdminComponent {

  public constructor(
    private route: ActivatedRoute,
    private router: Router,

    private activityProvider: ActivityProvider,
    private organisationProvider: OrganisationProvider,
    private sessionProvider: SessionProvider,
    private userProvider: UserProvider,

    private clientPackage: ClientPackage,
    private corePackage: CorePackage
  ) {

    // console.log('PKG', this.corePackage, this.clientPackage);

    console.log(this.route);
    console.log(this.router);
    // console.log(this.activityProvider);
    // console.log(this.userProvider);

    // console.log('ROUTE', ActivityStepperComponent.route());

    // this.tests();
  }

  private async tests() {
    // await this.sessionTest();
    // await this.providerTest();
    // await this.crudTest('00000000-0000-0000-0010-100000000000');
  }

  private async crudTest(id) {
    const activity = await this.activityProvider.readOne(id);
    console.log(activity); // ActivityModel { ... }

    const address = await activity.address;
    console.log(address); // AddressModel { ... }

    const suburb = await address.suburb;
    console.log(suburb); // SuburbModel { ... }
  }

  private async sessionTest() {
    console.log(this.sessionProvider);
    this.sessionProvider.subscribe((i) => {
      console.log('refresh_exp', i.refreshToken.exp - Date.now() / 1000);
      console.log('access__exp', i.accessToken.exp - Date.now() / 1000);
      console.log('refresh_jwt', i.refreshToken.raw);
      console.log('access__jwt', i.accessToken.raw);
    });

    await this.sessionProvider.login('super@user', 'test');
    await this.sessionProvider.refresh();
  }

  private async providerTest() {
    console.log('USERS', await this.userProvider.readAll());
    for (const user of await this.userProvider.readAll()) {
      try {
        console.log(await user.organisations);
      } catch (error) { }
    }

    console.log('ORGAS', await this.organisationProvider.readAll());
    for (const organisation of await this.organisationProvider.readAll()) {
      try {
        console.log(await organisation.users);
      } catch (error) { }
    }
  }

  // private async adminTestMethod(id) {
  //   const tag = { name: 'TAGGIDDY' } as TagModel;

  //   console.log(await (await this.activityProvider.readOne(id)).tags);
  //   await this.sessionProvider.login('super@user', 'test');
  //   await this.testMethod('00000000-0000-0000-0010-100000000000');
  //   await this.sessionProvider.refresh();
  //   await this.activityProvider.pasteTags(id, [tag]);
  //   // await this.sessionProvider.logout();
  //   console.log(await (await this.activityProvider.readOne(id)).tags);
  // }

}
