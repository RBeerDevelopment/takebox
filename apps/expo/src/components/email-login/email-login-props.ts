import { type LoginInputState } from "./login-input-state";

export interface EmailLoginProps {
  loginInputState: LoginInputState;
  dispatchLoginInput: (newState: Partial<LoginInputState>) => void;
}
