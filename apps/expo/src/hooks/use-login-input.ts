import { useReducer } from "react";

import { type LoginInputState } from "~/types/login-input-state";

export function useLoginInput() {
  const [loginInput, dispatchLoginInput] = useReducer(
    (state: LoginInputState, newState: Partial<LoginInputState>) => ({
      ...state,
      ...newState,
    }),
    {
      emailAddress: "",
      username: "",
      password: "",
    },
  );

  return { loginInput, dispatchLoginInput };
}
