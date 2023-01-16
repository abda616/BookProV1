import {Component, OnInit} from '@angular/core';
import {SharedDataModule} from "../shared/shared-data.module";
import {City} from "../shared/Interfaces/userSignup";
import {AsyncValidatorFn, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/Auth/auth.service";
import {delay, map, of} from "rxjs";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private sharedData: SharedDataModule, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.getUserProfile().subscribe(data => {
      this.userEmail.setValue(data['email']);
      this.firstName = data['firstName'];
      this.lastName = data["lastName"];
      this.profilePic = data['profileImageUrl'] ? data['profileImageUrl'] : "assets/Avatars/men_av_2.png";
      this.UCity = data['city'];

      localStorage.setItem("interests", data['interest']);
    })
    this.auth.exchange.exchangesFromMe().subscribe(value => {
      this.userExchanges = value
    })
    this.sharedData.Citys.subscribe(data => this.Citys = data);
    this.sharedData.Interests.subscribe(data => this.Interests = data);
    this.sharedData.Pattern.subscribe(data => this.patternValidator = data);
    this.sharedData.Avatars.subscribe(data => this.avatars = data);
  }

  firstName;
  lastName;
  userExchanges;
  avatars;
  profilePic;
  UCity;
  email;
  private patternValidator: string = '';
  Citys: City[] = [];
  Interests: string[] = [];
  userEmail = new FormControl('', [Validators.required, Validators.email]);
  UInterests: any = new FormControl(localStorage.getItem('interests').replace(/[{}']/gi, "").split(","));
  UEmail = new FormControl('', Validators.email)
  UPassword = new FormGroup({
    A: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(this.patternValidator)]),
    B: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(this.patternValidator)])
  }, {asyncValidators: customAsyncValidator()});

  EditUserPic() {
    this.auth.setUserData1({image: this.profilePic}).subscribe(value => {
      this.auth.toast.success(value['message'])
      this.auth.toast.info('U Will Be Loged Out To Update Data', "Saved... Log-Out 5 Sec")
      setTimeout(() => {
        this.auth.doLogout();
      }, 5000)
    }, error => {
      this.auth.toast.error(error.error['message'])
    });
  }

  UpdateUserName() {
    this.auth.setUserData2UserName(this.firstName, this.lastName).subscribe(value => {
      this.auth.toast.success(value['message'])
      this.auth.toast.info('U Will Be Loged Out To Update Data', "Saved... Log-Out 5 Sec")
      setTimeout(() => {
        this.auth.doLogout();
      }, 5000)
    }, error => {
      this.auth.toast.error(error.error['message'])
    });
  }

  UpdateEmail() {
    this.auth.setUserData1({email: this.email}).subscribe(value => {
      this.auth.toast.success(value['message'])
      this.auth.toast.info('U Will Be Loged Out To Update Data', "Saved... Log-Out 5 Sec")
      setTimeout(() => {
        this.auth.doLogout();
      }, 5000)
    }, error => {
      this.auth.toast.error(error.error['message'])
    });
  }


  UpdatePassword() {
    this.auth.setUserData2Password(this.UPassword.get('A').value, this.UPassword.get('B').value).subscribe(value => {
      this.auth.toast.success(value['message'])
      this.auth.toast.info('U Will Be Loged Out To Update Data', "Saved... Log-Out 5 Sec")
      setTimeout(() => {
        this.auth.doLogout();
      }, 5000)
    }, error => {
      this.auth.toast.error(error.error['message'])
    });
  }

  UpdateCity() {
    this.auth.setUserData1({city: this.UCity}).subscribe(value => {
      this.auth.toast.success(value['message'])
      this.auth.toast.info('U Will Be Loged Out To Update Data', "Saved... Log-Out 5 Sec")
      setTimeout(() => {
        this.auth.doLogout();
      }, 5000)
    }, error => {
      this.auth.toast.error(error.error['message'])
    });
  }


  UpdateInterst() {
    this.auth.setUserData1({interest: `{${this.UInterests.value.slice(1, this.UInterests.length)}}`}).subscribe(value => {
      this.auth.toast.success(value['message'])
      this.auth.toast.info('U Will Be Loged Out To Update Data', "Saved... Log-Out 5 Sec")
      setTimeout(() => {
        this.auth.doLogout();
      }, 5000)
    }, error => {
      this.auth.toast.error(error.error['message'])
    });
  }

  checkPasswordValidation() {
    return this.UPassword.invalid;
  }

  InterstLenght() {
    return this.UInterests.value.toString().split(',').length;
  }

  getErrorMessage() {
    if (this.userEmail.hasError('required')) {
      return 'You must enter a value';
    }
    return this.userEmail.hasError('email') ? 'Not a valid email' : '';
  }
}

function customAsyncValidator(): AsyncValidatorFn {
  return (group: FormGroup) => {
    const A = group.get('A').value;
    const B = group.get('B').value;
    return of('value').pipe(delay(0), map(() => (A === B ? null : {fields: true})));
  };
}
