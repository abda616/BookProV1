export interface userSignup {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  city: string,
  interest: string[];
}

export interface City {
  value: string;
  viewValue: string;
}

export interface userSignIn {
  email: string,
  password: string,
}
