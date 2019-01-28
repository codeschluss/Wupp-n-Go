import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBottomSheet, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { Router } from '@angular/router';
import { TokenProvider } from '@portal/core';
import { take } from 'rxjs/operators';
import { ConfigurationProvider } from 'src/realm/configuration/configuration.provider';
import { UserProvider } from 'src/realm/user/user.provider';
import { InfoBottomComponent } from './info.bottomsheet.component';

@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

    static readonly imports = [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule];

    public userName: string = '';
    public password: string = '';
    public error: string;
    public portalName: string;

    constructor(
        private router: Router,
        private tokenProvider: TokenProvider,
        private userProvider: UserProvider,
        private bottomSheet: MatBottomSheet,
        private configProvider: ConfigurationProvider) {
            this.configProvider.readAll().subscribe(configs => {
                this.portalName = configs.find(
                    config => config.item === 'portalName').value;
                });
        }

  public ngOnInit(): void {
    this.tokenProvider.value.pipe(take(1)).subscribe((tokens) => {
      if (tokens.access.id) {
        this.router.navigateByUrl('/admin');
      }
    });
  }

    login(): void {
        this.tokenProvider.login(this.userName, this.password).subscribe(
            () => {
                this.bottomSheet.open(InfoBottomComponent,
                    { data: { message: 'successfullyLoggedIn' } });
                    this.goToAccountArea();
            },
            error => {
                if (error.error && error.error.message) {
                    this.error = error.error.message.toLowerCase();
                } else {
                    this.error = error.statusText.toLowerCase();
                }
            });
    }

    resetPassword(): void {
        if (this.userName) {
            this.userProvider.resetPassword({value: this.userName})
            .subscribe(() => {
                this.bottomSheet.open(InfoBottomComponent,
                    { data: { message: 'successfullResetPassword' } });
            },
            () => { this.bottomSheet.open(InfoBottomComponent,
                    { data: { message: 'genericErrorMessage' } });
            });
        } else {
            this.bottomSheet.open(InfoBottomComponent,
                { data: { message: 'enterUserName' } });
        }
    }

    goToHome(): void {
        this.router.navigate(['/']);
    }

    goToAccountArea(): void {
        this.router.navigate(['/admin/account/']);
    }

    goToRegister(): void {
        this.router.navigate(['/register']);
    }
}
