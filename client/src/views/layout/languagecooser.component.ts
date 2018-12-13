import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LanguageProvider } from 'src/realm/language/language.provider';
import { SessionProvider } from '@portal/core';

@Component({
    selector: 'languagechooser-dialog',
    templateUrl: 'languagechooser.component.html',
  })
  export class LangaugeChooserDialogComponent {

    public text: string;
    public languages;

    constructor(
        public dialogRef: MatDialogRef<LangaugeChooserDialogComponent>,
        private languageProvider: LanguageProvider,
        private session: SessionProvider,
        ) {
        this.initLanguages();
      }

    onNoClick(): void {
      this.dialogRef.close();
    }

   public getTextContent(): string {
    return 'placeholder text';
   }

   //   Just Prototyping
    changeLanguage(locale: string) {

      this.session.changeLanguage(locale);
      location.reload();
    }

    private initLanguages(): void {
        this.languageProvider.readAll().then(langs => {
          this.languages = langs;
        });
    }



}