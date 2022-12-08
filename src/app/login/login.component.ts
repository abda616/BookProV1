import {Component, OnInit} from '@angular/core';
import {AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {delay, map, of} from "rxjs";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  private patternValidator: string = "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}";
  protected submitted = false;
  hidePass = true;
  signUpState: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.mLoginForm();
    this.mSignUpForm();
  }

  protected loginForm: FormGroup<{
    loginEmail: FormControl<string | null>;
    loginPassword: FormControl<string | null>;
  }>;
  protected signUpForm: FormGroup<{
    userName: FormControl<string | null>;
    UEmail: FormGroup<{
      a: FormControl<string | null>;
      b: FormControl<string | null> }>;
    UPassword: FormGroup<{
      A: FormControl<string | null>;
      B: FormControl<string | null>}>
  }>;

  mLoginForm() {
    this.loginForm = new FormGroup({
      loginEmail: new FormControl("", [Validators.email, Validators.required,Validators.minLength(4)]),
      loginPassword: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(this.patternValidator)])
    });
  }

  mSignUpForm() {
    this.signUpForm = new FormGroup({

      userName: new FormControl("", [Validators.required, Validators.minLength(4)]),
      UEmail: new FormGroup({
        a: new FormControl('', [Validators.email, Validators.required]),
        b: new FormControl('', [Validators.required]),
      }, {asyncValidators: customAsyncValidator()}),
      UPassword: new FormGroup({
        A: new FormControl("", [Validators.required, Validators.min(8), Validators.pattern(this.patternValidator)]),
        B: new FormControl("", [Validators.required,])
      }, {asyncValidators: customAsyncValidator()}),

      // Uinterist


    });
  }

  protected onLogin(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      localStorage.setItem("user-Data", JSON.stringify(this.loginForm.value));
      this.router.navigate(["/logs"]);
    }
  }

  openSignup() {
    this.signUpState = !this.signUpState;
  }

  getErrorMessage() {/*
    if ( !this.loginForm.get('loginEmail').valid ) {return 'You must enter a Email'; }
    else if (!this.loginForm.get('loginPassword').valid ){return 'You must enter a Password'; }
    return this.loginForm.hasError('loginEmail') ? 'Not a valid email or Password' : '';*/
  }


  P1(): string {
    return 'url("../../assets/picture/login-img-1.jpeg")';
  }

  P2(): string {
    return 'url("../../assets/picture/login-img-2.jpeg")';
  }
}

function customAsyncValidator(): AsyncValidatorFn {
  return (group: FormGroup) => {
    const a = group.get('a').value;
    const b = group.get('b').value;
    return of('value').pipe(delay(500),
      map((value) => (value === a || value === b ? null : {fields: true}))
    );
  };
}
