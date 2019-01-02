import { Component } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionProvider } from '@portal/core';

@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent {

    static readonly imports = [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule];

    userName: string = '';
    password: string = '';
    error: string;

    constructor(
        private router: Router,
        private session: SessionProvider) {
            if (this.router.url.endsWith('logout')) {
                this.session.logout();
            }
        }

    login(): void {
        this.session.login(this.userName, this.password).subscribe(
            () => this.goToHome(),
            error => {
                if (error.error && error.error.message) {
                    this.error = error.error.message.toLowerCase();
                } else {
                    this.error = error.statusText.toLowerCase();
                }
            });
    }

    goToHome(): void {
        this.router.navigate(['/admin/account/']);
    }

    goToRegister(): void {
        this.router.navigate(['/register']);
    }
}
