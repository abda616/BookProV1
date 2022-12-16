import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {delay, map, of} from "rxjs";
import {SignUpService} from "../services/signUpServices/sign-up.service";
import {userSignIn, userSignup} from "../services/signUpServices/userSignup";
import {AuthService} from "../shared/auth.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [SignUpService, AuthService]

})
export class LoginComponent implements OnInit, AfterViewChecked, userSignup {

  private patternValidator: string = "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}";
  submitted = false;
  signUpState = false;
  hidePass = true;

  openSignup() {
    this.signUpState = !this.signUpState;
  }

  citys: City[] = [
    {value: 'amman', viewValue: 'Amman'},
    {value: 'zarqa', viewValue: 'Zarqa'},
    {value: 'balqaa', viewValue: 'Balqa\'a'},
  ];
  Interests: string[] = ['Drama', 'Fiction', 'Nonfiction', 'Poetry', 'Psychology', 'Religion', 'Fantasy', 'Self Help', 'Thrillers', 'Sci-fi', 'Romance'];

  UInterests = new FormControl();

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

  disabledControl = new FormControl(false);

  /*----------------------------------------------------------*/
  constructor(private formBuilder: FormBuilder, private router: Router,
              /*private signUp: SignUpService,*/
              private signIn: AuthService
  ) {
  }

  ngOnInit(): void {
    this.mLoginForm();
    this.mSignUpForm();
    this.disabledControl.valueChanges.pipe()
      .subscribe((val) => {
        if (val) this.UInterests.disable();
        else this.UInterests.enable();
      });
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

      let intoUser:userSignIn={
        email :this.loginForm.get('loginEmail').value,
        password:this.loginForm.get('loginPassword').value
      };
      console.log(intoUser);
      this.signIn.signIn(intoUser);
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
    this.signIn.signUp(adduser).subscribe();
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

interface City {
  value: string;
  viewValue: string;
}
