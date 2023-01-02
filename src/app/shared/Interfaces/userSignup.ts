export interface userSignUp {
  userName: string,
  email: string,
  password: string,
  matchingPassword: string,
  firstName: string,
  lastName: string,
  image: string,
  city: string,
  interest: string;
}

export interface userSignIn {
  email: string,
  password: string,
}

export interface City {
  value: string;
  viewValue: string;
}

export interface avatarPicture {
  picValue: string;
  viewValue: string;
}
