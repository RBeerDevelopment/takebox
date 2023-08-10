import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, Text, View } from "react-native";

import { useKeyboardVisible } from "~/hooks/use-keyboard-visible";
import { IconOnlyButton } from "../icon-button";
import { StyledTextInput } from "../inputs/styled-text-input";

interface Props {
  options: string[];
  presetTags?: string[];
  onChange: (tags: string[]) => void;
  title?: string;
}

export function TagInput(props: Props): React.ReactElement {
  const { options, onChange, presetTags, title } = props;

  const [newTag, setNewTag] = React.useState<string>("");

  const isKeyboardVisible = useKeyboardVisible();

  const [tags, setTags] = React.useState<string[]>(presetTags ?? []);

  // const [suggestedTags, setSuggestedTags] = React.useState<string[]>(options);

  function onInputChange(text: string) {}

  return (
    <View className="my-8 flex flex-col">
      <StyledTextInput
        onEnterPress={() => {
          if (!newTag) return;
          setTags([...tags, newTag]);
          // use delay to avoid issues
          setTimeout(() => setNewTag(""), 50);
        }}
        value={newTag}
        label={title}
        onChangeText={setNewTag}
        multiline={false}
        autoCorrect={false}
      />
      {options.length > 0 && (
        <ScrollView
          className={`${
            isKeyboardVisible ? "absolute" : "hidden"
          } -top-40 z-50 h-40 w-full transform overflow-scroll rounded-2xl bg-gray-800 shadow-sm shadow-gray-800`}
        >
          {options.map((tag, index) => (
            <View key={index} className="flex flex-col px-2">
              <Text className="px-2 py-4 text-white">{tag}</Text>
              <View className="mx-auto h-px w-full bg-black" />
            </View>
          ))}
        </ScrollView>
      )}
      <View className="flex w-full flex-row flex-wrap overflow-x-hidden">
        {tags.map((tag, index) => (
          <View
            key={index}
            className="bg-primary-dark mx-2 my-2 flex w-fit flex-row items-center justify-center rounded-full px-2 py-1"
          >
            <Text>{tag}</Text>
            <IconOnlyButton
              iconName="cancel"
              iconFont="material"
              style="pl-1"
              onPress={() => setTags(tags.filter((_, i) => i !== index))}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
