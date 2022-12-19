import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {delay, map, of} from "rxjs";
import {City, userSignIn, userSignup} from "../shared/Interfaces/userSignup";
import {AuthService} from "../shared/Auth/auth.service";
import {SharedDataModule} from "../shared/shared-data.module";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, SharedDataModule]
})
export class LoginComponent implements OnInit, AfterViewChecked, userSignup {
  constructor(private formBuilder: FormBuilder, private router: Router,
              private myAuth: AuthService, private sharedData: SharedDataModule
  ) {
  }

  ngOnInit(): void {
    this.sharedData.Citys.subscribe(data =>
      this.citys = data);
    this.sharedData.Interests.subscribe(data =>
      this.Interests = data);
    this.sharedData.Pattern.subscribe(data => this.patternValidator = data);
    this.mLoginForm();
    this.mSignUpForm();
    this.disabledControl.valueChanges.pipe().subscribe((val) => {
      if (val) this.UInterests.disable();
      else this.UInterests.enable();
    });
  }

  /*----------------------------------------------------------*/
  private patternValidator: string = '';
  citys: City[] = [];
  Interests: string[] = [];
  submitted = false;
  signUpState = false;
  hidePass = true;

  openSignup() {
    this.signUpState = !this.signUpState;
  }


  UInterests = new FormControl();
  disabledControl = new FormControl(false);

  getLength() {
    let x: string[] = [];
    if (this.UInterests.value != null) {
      x = this.UInterests.value;
      return x.length;
    }
    return 0;
  }

  getValueInterests() {
    let x: string[] = [];
    if (this.UInterests.value != null) {
      x = this.UInterests.value
      return x;
    }
    return null;
  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.signUpForm.get('UInterests').setValue(this.getValueInterests())
    }, 10)
  }

  /*----------------------------------------------------------*/
  loginForm: FormGroup;

  mLoginForm() {
    this.loginForm = new FormGroup({
        loginEmail: new FormControl('admin@jo', [Validators.email, Validators.required, Validators.minLength(4)]),
        loginPassword: new FormControl('@Aa12345', [Validators.required, Validators.minLength(8), Validators.pattern(this.patternValidator)])
      });
  }

  signUpForm: FormGroup;

  mSignUpForm() {
    this.signUpForm = new FormGroup(
      {
        UName: new FormGroup({
          FirstName: new FormControl('1asd', [Validators.required, Validators.minLength(3)]),
          LastName: new FormControl('1asd', [Validators.required, Validators.minLength(3)]),
        }),
        UEmail: new FormGroup({
          A: new FormControl('asd1@asd', [Validators.email, Validators.required]),
          B: new FormControl('asd1@asd', [Validators.email, Validators.required]),
        }, {asyncValidators: customAsyncValidator()}),
        UPassword: new FormGroup({
          A: new FormControl('1asd@asd123', [Validators.required, Validators.minLength(8), Validators.pattern(this.patternValidator)]),
          B: new FormControl('1asd@asd123', [Validators.required, Validators.minLength(8), Validators.pattern(this.patternValidator)])
        }, {asyncValidators: customAsyncValidator()}),
        UAddress: new FormControl('amman', Validators.required),
        UInterests: new FormControl()
      });
  }

  /*------------------------------------------*/
  protected onLogin(): void {
    this.submitted = true;
    if (this.loginForm.valid) {

      let intoUser: userSignIn = {
        email: this.loginForm.get('loginEmail').value,
        password: this.loginForm.get('loginPassword').value
      };
      console.log(intoUser);
      this.myAuth.signIn(intoUser).subscribe((next) => {
        localStorage.setItem('access_token', next.token);
        localStorage.setItem('user_Email', next.email);
        localStorage.setItem('user_Id', next.id);
        this.router.navigate(['app']).then()
      });
    }
  }

  onSignUp(): void {
    let adduser: userSignup = {
      email: this.signUpForm.get('UEmail').get('A').value,
      password: this.signUpForm.get('UPassword').get('A').value,
      firstName: this.signUpForm.get('UName').get('FirstName').value,
      lastName: this.signUpForm.get('UName').get('LastName').value,
      city: this.signUpForm.get('UAddress').value,
      interest: this.signUpForm.get('UInterests').value,
    };
    console.log(adduser);
    this.myAuth.signUp(adduser).subscribe();
    this.openSignup()
  }

  protected ValidateSignUp(): boolean {
    return !(this.signUpForm.valid && this.getLength() >= 3);
  }


  getErrorMessage() {
    if (!this.loginForm.get('loginEmail').valid) {
      return 'You must enter an Email';
    } else if (!this.loginForm.get('loginPassword').valid) {
      return 'You must enter a Password';
    }
    return this.loginForm.hasError('loginEmail') ? 'Not a valid email or Password' : '';
  }

  city: string;
  email: string;
  firstName: string;
  interest: string[];
  lastName: string;
  password: string;
}

function customAsyncValidator(): AsyncValidatorFn {
  return (group: FormGroup) => {
    const A = group.get('A').value;
    const B = group.get('B').value;
    return of('value').pipe(delay(500), map(() => (A === B ? null : {fields: true})));
  };
}
