import { AfterViewInit, Component, ElementRef, TRANSLATIONS, TRANSLATIONS_FORMAT, ViewChild } from '@angular/core';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { I18nResolver } from 'src/services/resolvers';

export function TRANSLATIONS_FACTORY(i18n: I18nResolver) {
  return i18n.translation;
}

@Component({
  providers: [
    I18n,
    {
      deps: [I18nResolver],
      provide: TRANSLATIONS,
      useFactory: TRANSLATIONS_FACTORY
    },
    {
      provide: TRANSLATIONS_FORMAT,
      useValue: 'xlf'
    }
  ],
  // tslint:disable-next-line:component-selector
  selector: 'i18n',
  template: `<slot #text><ng-content></ng-content></slot>`
})

export class I18nComponent implements AfterViewInit {

  public static readonly imports = [];

  @ViewChild('text')
  private text: ElementRef;

  public constructor(
    private i18n: I18n
  ) { }

  public get value(): string {
    return this.text.nativeElement.innerHTML;
  }

  public ngAfterViewInit(): void {
    const text = this.text.nativeElement.innerHTML;
    const i18n = this.i18n({ id: text, value: text });
    this.text.nativeElement.innerHTML = i18n || text;
  }

}