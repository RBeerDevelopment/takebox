import React from "react";
import { useRouter } from "expo-router";

import { StyledButton } from "./button";

export function ModalCloseButton(): React.ReactElement {
  const router = useRouter();
  return (
    <StyledButton
      onPress={router.back}
      text="Close"
      buttonStyle="w-fit pl-1 -translate-y-2"
      textStyle="text-primary"
    />
  );
}
