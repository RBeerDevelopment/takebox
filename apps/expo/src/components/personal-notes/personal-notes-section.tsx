import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";

import { api } from "~/utils/api";
import { showAlert } from "~/utils/interactions/show-alert";
import { showAlertPrompt } from "~/utils/interactions/show-alert-prompt";
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
    showAlertPrompt({
      title: "New Personal Note",
      message: "What do you want to remember?",
      callback: addPersonalNote,
    });
  }

  function modifyPersonalNote() {
    showAlertPrompt({
      title: "Update Personal Note",
      message: "What do you want to remember?",
      callback: (content) =>
        updatePersonalNote(notes?.at(0)?.id as string, content),
      defaultValue: notes?.at(0)?.content,
    });
  }

  function removePersonalNote() {
    showAlert({
      title: "Delete Personal Note",
      message: "Are you sure you want to delete this note?",
      positiveButton: {
        text: "Delete",
        isDestructive: true,
        onPress: () => deletePersonalNote(notes?.at(0)?.id as string),
      },
    });
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
            iconFont="material"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
