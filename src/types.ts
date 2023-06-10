export interface SigninValues {
  email: string;
  password: string;
}

export interface SignupValues extends SigninValues {
  confirmPassword: string;
}

export interface BreakpointsProps {
  theme: {
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
  };
}
