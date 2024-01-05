import { type LoginInputState } from "../../types/login-input-state";

export type EmailLoginProps = {
  loginInputState: LoginInputState;
  dispatchLoginInput: (newState: Partial<LoginInputState>) => void;
};
