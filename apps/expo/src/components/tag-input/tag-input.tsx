import React from "react";
import { Keyboard, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { api } from "~/utils/api";
import { useKeyboardVisible } from "~/hooks/use-keyboard-visible";
import { IconOnlyButton } from "../icon-button";
import { StyledTextInput } from "../inputs/styled-text-input";

interface Props {
  tags: string[];
  onChange: (tags: string[]) => void;
  title?: string;
}

export function TagInput(props: Props): React.ReactElement {
  const { onChange, tags, title } = props;
  const { data: suggestedTags } = api.user.getUserTags.useQuery();

  const [newTag, setNewTag] = React.useState<string>("");
  const [hasFocus, setHasFocus] = React.useState<boolean>(false);

  const isKeyboardVisible = useKeyboardVisible();

  function handleAddTag(input: string) {
    if (!input.trim()) return;
    onChange([...tags, input]);

    setTimeout(() => setNewTag(""), 50);
  }

  return (
    <View className="my-8 flex flex-col">
      <StyledTextInput
        onEnterPress={() => handleAddTag(newTag)}
        value={newTag}
        label={title}
        onChangeText={setNewTag}
        multiline={false}
        autoCorrect={false}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
      />
      {hasFocus && suggestedTags && suggestedTags.length > 0 && (
        <ScrollView
          className={`${
            isKeyboardVisible ? "absolute" : "hidden"
          } -top-40 z-50 max-h-40 w-full transform overflow-scroll rounded-2xl bg-gray-800 shadow-sm shadow-gray-800`}
        >
          {suggestedTags.map((tag, index) => (
            <TouchableOpacity
              key={index}
              className="flex flex-col px-2"
              onPress={() => {
                handleAddTag(tag.name);
                Keyboard.dismiss();
              }}
            >
              <Text className="px-2 py-4 text-white">{tag.name}</Text>
              <View className="mx-auto h-px w-full bg-black" />
            </TouchableOpacity>
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
              onPress={() => onChange(tags.filter((_, i) => i !== index))}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
