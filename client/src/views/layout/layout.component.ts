import { Component } from '@angular/core';
import { SessionProvider } from '@portal/core';

@Component({
  selector: 'layout-component',
  styleUrls: ['layout.component.scss'],
  templateUrl: 'layout.component.html'
})

export class LayoutComponent {

  public static readonly imports = [];
  public showCookiesInfo = true;

  public constructor(
    private sessionProvider: SessionProvider
  ) {
    this.sessionProvider.value
    .subscribe((next) => { this.showCookiesInfo =
      typeof next.cookiesAccepted === 'undefined'; }
      );
  }

  public acceptCookies(accept: boolean): void {
    this.sessionProvider.acceptCookies(accept);
    this.showCookiesInfo = false;
  }


}
