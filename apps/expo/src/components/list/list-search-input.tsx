import React from "react";

import { StyledTextInput } from "../inputs/styled-text-input";

interface Props {
  query: string;
  setQuery: (query: string) => void;
}

export function ListSearchInput(props: Props): React.ReactElement {
  const { query, setQuery } = props;
  return (
    <StyledTextInput
      onEnterPress={() => {
        return;
      }}
      value={query}
      label="Listname"
      onChangeText={(newValue) => setQuery(newValue.toLowerCase())}
      multiline={false}
      autoCorrect={false}
      // onFocus={() => setHasFocus(true)}
      // onBlur={() => setHasFocus(false)}
      autoCapitalize="none"
    />
  );
}
