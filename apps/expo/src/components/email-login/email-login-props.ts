import { type LoginInputState } from "../../types/login-input-state";

export interface EmailLoginProps {
  loginInputState: LoginInputState;
  dispatchLoginInput: (newState: Partial<LoginInputState>) => void;
}
