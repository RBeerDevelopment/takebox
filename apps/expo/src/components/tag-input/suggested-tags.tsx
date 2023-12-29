import React from "react";
import { Keyboard, TouchableOpacity, View } from "react-native";
import fuzzysort from "fuzzysort";

import { api } from "~/utils/api";
import { ThemeableText } from "../themeable/themable-text";

interface Props {
  show: boolean;
  onAdd: (tag: string) => void;
  currentInput: string;
}

export function SuggestedTags(props: Props): React.ReactElement {
  const { show, onAdd, currentInput } = props;

  const { data } = api.user.getUserTags.useQuery();
  const availableTags = data?.map((tag) => tag.name) ?? [];

  let suggestedTags = fuzzysort
    .go(currentInput, availableTags, {})
    .map((fuzzy) => fuzzy.target);

  if (currentInput.length === 0) {
    suggestedTags = availableTags;
  }

  if (!show || !suggestedTags || suggestedTags.length === 0) return <></>;

  return (
    <View className="w-full transform rounded-2xl bg-gray-800 shadow-sm shadow-gray-800">
      {suggestedTags.slice(0, 5).map((tag, index) => (
        <TouchableOpacity
          key={index}
          className="w-full px-2 py-1"
          onPress={() => {
            onAdd(tag);
            Keyboard.dismiss();
          }}
        >
          <ThemeableText className="px-2 py-4">{tag}</ThemeableText>
        </TouchableOpacity>
      ))}
    </View>
  );
}
