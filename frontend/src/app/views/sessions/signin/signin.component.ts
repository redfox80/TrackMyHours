import {Component, OnInit} from '@angular/core';
import {SharedAnimations} from 'src/app/shared/animations/shared-animations';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd} from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
  loading: boolean;
  loadingText: string;
  loginError: boolean;
  loginErrorText: string;
  signinForm;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.loadingText = 'Loading Dashboard Module...';

        this.loading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.loading = false;
      }
    });

    let creds = {
      email: (environment.production) ? '':'joakim@forde.it',
      password: (environment.production) ? '':'123456',
    };

    this.signinForm = this.fb.group({
      email: [creds.email, Validators.required],
      password: [creds.password, Validators.required]
    });
  }

  signin() {
    this.loginError = true;
    this.loading = true;
    this.loadingText = 'Sigining in...';
    this.auth.signin(this.signinForm.value)
      .subscribe(res => {
          this.loading = false;
          this.router.navigateByUrl('/home');
        },
        err => {
          this.loading = false;

          if(err['status'] == 401) {
            this.loginErrorText = "Invalid credentials";
          } else {
            this.loginErrorText = "Something went wrong, reload and try again";
          }

          this.loginError = true;
        }
      );
  }

}
