import React from "react";
import { View } from "react-native";

import { StyledTextInput } from "../inputs/styled-text-input";
import { SuggestedTags } from "./suggested-tags";
import { TagList } from "./tag-list";

interface Props {
  tags: string[];
  onChange: (tags: string[]) => void;
  title?: string;
}

export function TagInput(props: Props): React.ReactElement {
  const { onChange, tags, title } = props;

  const [newTag, setNewTag] = React.useState<string>("");
  const [hasFocus, setHasFocus] = React.useState<boolean>(false);

  function handleAddTag(input: string) {
    if (!input.trim()) return;
    onChange([...tags, input]);

    setTimeout(() => setNewTag(""), 50);
  }

  return (
    <View className="mb-4 mt-1 flex flex-col">
      <StyledTextInput
        onEnterPress={() => handleAddTag(newTag)}
        value={newTag}
        label={title}
        onChangeText={(newValue) => setNewTag(newValue.toLowerCase())}
        multiline={false}
        autoCorrect={false}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        autoCapitalize="none"
      />
      <SuggestedTags
        show={hasFocus}
        onAdd={handleAddTag}
        currentInput={newTag}
      />
      <TagList
        tags={tags}
        onDelete={(index) => onChange(tags.filter((_, i) => i !== index))}
      />
    </View>
  );
}
