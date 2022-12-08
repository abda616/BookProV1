import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  private patternValidator: string = "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}";
  protected submitted = false;hidePass = true;
  signUpState:boolean=false;
  constructor(private formBuilder: FormBuilder, private router: Router ,private _formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.mLoginForm(); this.mSignUpForm();
  }

  firstFormGroup = this._formBuilder.group({
    name: ['',Validators.required,],
    email:['',Validators.email,Validators.required,],
    Cemail:['',Validators.email,Validators.required,],
    pass:['',Validators.pattern(this.patternValidator),Validators.required,],
    Cpass:['',Validators.pattern(this.patternValidator),Validators.required,],
  });
  protected loginForm: FormGroup<{
    loginEmail: FormControl<string | null>;
    loginPassword: FormControl<string | null>;
  }>;
  protected signUpForm: FormGroup<{
    AsUEmail: FormControl<string | null>;
    BsUEmail: FormControl<string | null>;
    AsUPassword: FormControl<string | null>;
    BsUPassword: FormControl<string | null>;
  }>;

  mLoginForm() {
    this.loginForm = new FormGroup({
      loginEmail: new FormControl("", [Validators.email, Validators.required]),
      loginPassword: new FormControl("", [Validators.required, Validators.min(8), Validators.pattern(this.patternValidator)])
    });
  }
   mSignUpForm() {
    this.signUpForm = new FormGroup({
      AsUEmail: new FormControl("", [Validators.email, Validators.required]),
      BsUEmail: new FormControl("", [Validators.email, Validators.required]),

      AsUPassword: new FormControl("", [Validators.required, Validators.min(8), Validators.pattern(this.patternValidator)]),
      BsUPassword: new FormControl("", [Validators.required,] )
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


  P1():string {
    return 'url("../../assets/picture/login-img-1.jpeg")';
  }
  P2():string {
    return 'url("../../assets/picture/login-img-2.jpeg")';
  }
}
