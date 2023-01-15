import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {delay, map, of} from "rxjs";
import {avatarPicture, City, userSignIn, userSignUp} from "../shared/Interfaces/userSignup";
import {AuthService} from "../shared/Auth/auth.service";
import {SharedDataModule} from "../shared/shared-data.module";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, SharedDataModule]
})
export class LoginComponent implements OnInit, AfterViewChecked, userSignUp {
  constructor(private formBuilder: FormBuilder, private router: Router,
              private myAuth: AuthService, private sharedData: SharedDataModule,
  ) {
  }

  ngOnInit(): void {
    if (this.myAuth.isLoggedIn) {
      this.router.navigate(["app"]).then();
    }

    this.sharedData.Citys.subscribe(data => this.citys = data);
    this.sharedData.Avatars.subscribe(data => this.avatars = data);
    this.sharedData.Interests.subscribe(data => this.Interests = data);
    this.sharedData.Pattern.subscribe(data => this.patternValidator = data);

    this.mLoginForm();
    this.mSignUpForm();

    this.disabledControl.valueChanges.pipe().subscribe((val) => {
      if (val) this.UInterests.disable(); else this.UInterests.enable();
    });
  }

  /*----------------------------------------------------------*/
  private patternValidator: string = '';
  citys: City[] = [];
  avatars: avatarPicture[] = [];
  Interests: string[] = [];
  signUpState = false;
  hidePass = true;
  UInterests = new FormControl();
  disabledControl = new FormControl(false);

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.signUpForm.get('UInterests').setValue(this.getValueInterests())
    }, 0);
  }

  /*----------------------------------------------------------*/
  loginForm: FormGroup;
  signUpForm: FormGroup;

  mLoginForm() {
    this.loginForm = new FormGroup({
      loginEmail: new FormControl('', [Validators.required, Validators.minLength(4)]),
      loginPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  mSignUpForm() {
    this.signUpForm = new FormGroup(
      {
        UAvatar: new FormControl('assets/Avatars/men_av_1.png', Validators.required),
        UName: new FormGroup({
          FirstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
          LastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        }),
        UEmail: new FormControl('', [Validators.email, Validators.required]),
        userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
        UPassword: new FormGroup({
          A: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(this.patternValidator)]),
          B: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(this.patternValidator)])
        }, {asyncValidators: customAsyncValidator()}),
        UAddress: new FormControl('amman', Validators.required),
        UInterests: new FormControl()
      });
  }

  /*------------------------------------------*/
  protected onLogin(): void {
    if (this.loginForm.valid) {
      let intoUser: userSignIn = {
        email: this.loginForm.get('loginEmail').value,
        password: this.loginForm.get('loginPassword').value
      };
      this.myAuth.signIn(intoUser).subscribe((next) => {
        localStorage.setItem('access_token', next['access_token']);
        localStorage.setItem('refresh_token', next['refresh_token']);
        this.myAuth.toast.success("Logged in Successfully", "Welcome")
        this.router.navigate(['app']).then()
      }, error => {
        this.myAuth.toast.error(error.error.message, "Error")
      });
    }
  }

  onSignUp(): void {
    let adduser: userSignUp = {
      email: this.signUpForm.get('UEmail').value,
      userName: this.signUpForm.get('userName').value,
      password: this.signUpForm.get('UPassword').get('A').value,
      matchingPassword: this.signUpForm.get('UPassword').get('B').value,

      firstName: this.signUpForm.get('UName').get('FirstName').value,
      lastName: this.signUpForm.get('UName').get('LastName').value,
      city: this.signUpForm.get('UAddress').value,
      image: this.signUpForm.get('UAvatar').value,
      interest: `{${this.signUpForm.get('UInterests').value.toString()}}`
    };
    this.myAuth.signUp(adduser).subscribe((next) => {
      this.myAuth.toast.success(next.message, "Welcome");
      this.openSignup();
    }, error => {
      this.myAuth.toast.error(error.error.message, "Error");
    });
  }

  protected validateSignUp(): boolean {
    return !(this.signUpForm.valid && this.getLength() >= 3);
  }


  openSignup() {
    this.signUpState = !this.signUpState;
  }

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

  email: string;
  userName: string;
  password: string;
  matchingPassword: string;
  firstName: string;
  lastName: string;
  image: string;
  interest: string;
  city: string;
  getErrorMessage() {
    if (!this.loginForm.get('loginEmail').valid) {
      return 'You must enter an Email';
    } else if (!this.loginForm.get('loginPassword').valid) {
      return 'You must enter a Password';
    }
    return this.loginForm.hasError('loginEmail') ? 'Not a valid email or Password' : '';
  }
}
function customAsyncValidator(): AsyncValidatorFn {
  return (group: FormGroup) => {
    const A = group.get('A').value;
    const B = group.get('B').value;
    return of('value').pipe(delay(500), map(() => (A === B ? null : {fields: true})));
  };
}
