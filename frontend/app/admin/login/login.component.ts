import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MdInputModule, MdFormFieldControl } from '@angular/material';

@Component({
	templateUrl: './login.html'
})
export class LoginComponent {
	public userNameInput: string;
	public passwordInput: string;

	constructor(private location: Location, private router: Router, private route: ActivatedRoute) { }

	cancel() {
		this.location.back();
	}

	fakeLogin(): void {
		if (this.userNameInput === 'john' && this.passwordInput === 'doe') {
			this.router.navigate(['/admin1']);
			console.log('you are now logged in');
		} else {
			console.log('login rejected');
		}
	}
}
