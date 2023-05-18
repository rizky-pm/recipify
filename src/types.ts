export interface SigninValues {
  email: string;
  password: string;
}

export interface SignupValues extends SigninValues {
  confirmPassword: string;
}
