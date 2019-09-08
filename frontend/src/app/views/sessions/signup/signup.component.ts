import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [SharedAnimations]
})
export class SignupComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
  ) { }

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.compose([
      Validators.required,
      Validators.email,
    ])],
    password: ['', Validators.compose([
      Validators.required,
    ])],
    c_password: ['', Validators.compose([
      Validators.required,
    ])]
  });

  public name = this.registerForm.get('name');
  public email = this.registerForm.get('email');
  public password = this.registerForm.get('password');
  public c_password = this.registerForm.get('c_password');

  register() {
    if(!this.registerForm.valid) return;

    const creds = {
      name: this.registerForm.controls['name'].value,
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
      c_password: this.registerForm.controls['c_password'].value,
    };

    let req = this.auth.register(creds.name, creds.email, creds.password, creds.c_password)

    req.subscribe(
      res => {
        if(res['status'] == 201) {
          this.auth.signin({
            email: creds.email,
            password: creds.password,
          });
        }
      },
      err => console.log(err),
    );
  }


  ngOnInit() {
  }

}
