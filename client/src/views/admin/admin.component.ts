import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingProvider, Pathfinder, TokenProvider } from '@portal/core';
import { filter, switchMap, take } from 'rxjs/operators';
import { ClientPackage } from '../../utils/package';
import { ReloginDialogComponent } from './dialogs/relogin.dialog';
import { AccountPanelComponent } from './panels/account/account.panel';

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['admin.scss'],
  template: `
    <main id="admin" [class.disabled]="loadingProvider.value | async">
      <router-outlet></router-outlet>
    </main>
  `
})

export class AdminComponent implements OnInit {

  public constructor(
    public loadingProvider: LoadingProvider,
    private dialog: MatDialog,
    private pathfinder: Pathfinder,
    private route: ActivatedRoute,
    private router: Router,
    private tokenProvider: TokenProvider
  ) { }

  public ngOnInit(): void {
    const claim = ClientPackage.config.jwtClaims.userId;
    const userId = this.route.snapshot.data.tokens.access[claim];

    if (userId) {
      this.work();

      if (!this.route.snapshot.firstChild) {
        const path = this.pathfinder.to(AccountPanelComponent).concat(userId);
        this.router.navigate(path);
      }
    } else {
      this.router.navigateByUrl('/');
    }
  }

  private work(): void {
    this.tokenProvider.value.pipe(
      filter((tokens) => !tokens.refresh.raw), take(1),
      switchMap(() => this.dialog.open(ReloginDialogComponent).afterClosed()),
      filter(Boolean)
    ).subscribe(() => this.work());
  }

}
