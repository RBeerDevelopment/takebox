import React from "react";
import { Keyboard, ScrollView, TouchableOpacity, View } from "react-native";
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

  suggestedTags = suggestedTags.slice(0, 5);

  if (!show || !suggestedTags || suggestedTags.length === 0) return <></>;

  return (
    <ScrollView className="absolute -top-40 z-50 max-h-40 w-full transform overflow-scroll rounded-2xl bg-white shadow-lg dark:bg-gray-800 dark:shadow-sm dark:shadow-gray-800">
      {suggestedTags.map((tag, index) => (
        <TouchableOpacity
          key={index}
          className="flex flex-col px-2"
          onPress={() => {
            onAdd(tag);
            Keyboard.dismiss();
          }}
        >
          <ThemeableText className="px-2 py-4">{tag}</ThemeableText>
          {index !== suggestedTags.length - 1 && (
            <View className="mx-auto h-px w-full bg-gray-300 dark:bg-black" />
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
