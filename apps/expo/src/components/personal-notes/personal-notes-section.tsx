import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";

import { api } from "~/utils/api";
import { useAddPersonalNote } from "~/hooks/queries/personal-notes/use-add-personal-note";
import { useDeletePersonalNote } from "~/hooks/queries/personal-notes/use-delete-personal-note";
import { useUpdatePersonalNote } from "~/hooks/queries/personal-notes/use-update-personal-note";
import { IconOnlyButton } from "../icon-button";
import { ThemeableText } from "../themeable/themable-text";

interface Props {
  restaurantId?: string;
}

export function PersonalNotesSection(props: Props) {
  const { restaurantId } = props;

  const { data: notes, isError } =
    api.restaurant.getPersonalNotesForRestaurantId.useQuery(
      { restaurantId: restaurantId || "" },
      { enabled: Boolean(restaurantId) },
    );

  const addPersonalNote = useAddPersonalNote(restaurantId);
  const deletePersonalNote = useDeletePersonalNote(restaurantId);
  const updatePersonalNote = useUpdatePersonalNote(restaurantId);

  function newPersonalNote() {
    Alert.prompt(
      "New Personal Note",
      "What do you want to remember?",
      addPersonalNote,
      "plain-text",
      "",
      "default",
      { userInterfaceStyle: "dark" },
    );
  }

  function modifyPersonalNote() {
    Alert.prompt(
      "Update Personal Note",
      "What do you want to remember?",
      (content) => updatePersonalNote(notes?.at(0)?.id as string, content),
      "plain-text",
      notes?.at(0)?.content || "",
      "default",
      { userInterfaceStyle: "dark" },
    );
  }

  function removePersonalNote() {
    Alert.alert(
      "Delete Personal Note",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deletePersonalNote(notes?.at(0)?.id as string),
        },
      ],
    );
  }

  if (!restaurantId || notes?.length === 0)
    return (
      <TouchableOpacity onPress={newPersonalNote}>
        <View className="mx-4 flex flex-row space-x-1 rounded-lg bg-gray-800 p-3">
          <ThemeableText className="font-bold">+</ThemeableText>
          <ThemeableText className="ml-2 italic">
            Add a personal note
          </ThemeableText>
        </View>
      </TouchableOpacity>
    );
  if (isError)
    return (
      <ThemeableText className="mx-auto italic text-red-800">
        Error loading notes.
      </ThemeableText>
    );

  return (
    <TouchableOpacity onPress={modifyPersonalNote}>
      <View className="mx-4 flex flex-col space-y-2">
        <ThemeableText className="font-bold">Personal Note</ThemeableText>
        <View className="flex flex-row items-center justify-between space-y-2 rounded-lg bg-gray-800 p-3">
          <ThemeableText key={notes?.at(0)?.id}>
            {notes?.at(0)?.content}
          </ThemeableText>
          <IconOnlyButton
            onPress={removePersonalNote}
            iconName="delete"
            iconColor="white"
            iconFont="material"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
