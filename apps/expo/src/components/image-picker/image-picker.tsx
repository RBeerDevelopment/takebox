import { Image, View } from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import { useActionSheet } from "@expo/react-native-action-sheet";

import { IconButton, IconOnlyButton } from "../icon-button";

const ACTION_SHEET_OPTIONS = ["Pick Image", "Take Image", "Cancel"];
const ACTION_SHEET_CANCEL_INDEX = 2;

const IMAGE_PICKER_OPTIONS: ExpoImagePicker.ImagePickerOptions = {
  mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 0.5,
};

interface Props {
  imageUri: string | null;
  onChangeImageUri: (uri: string | null) => void;
}

export function ImagePicker(props: Props) {
  const { imageUri, onChangeImageUri } = props;
  const { showActionSheetWithOptions } = useActionSheet();

  const [_, requestPermission] = ExpoImagePicker.useCameraPermissions();

  const pickImage = () => {
    showActionSheetWithOptions(
      {
        options: ACTION_SHEET_OPTIONS,
        cancelButtonIndex: ACTION_SHEET_CANCEL_INDEX,
      },
      async (selectedIndex: number | undefined) => {
        switch (selectedIndex) {
          case 0: {
            const result = await ExpoImagePicker.launchImageLibraryAsync(
              IMAGE_PICKER_OPTIONS,
            );
            if (result?.canceled || !result?.assets[0]?.uri) return;

            onChangeImageUri(result.assets[0].uri);
            break;
          }
          case 1: {
            const { granted } = await requestPermission();
            if (!granted) return;
            const result = await ExpoImagePicker.launchCameraAsync(
              IMAGE_PICKER_OPTIONS,
            );
            if (result?.canceled || !result?.assets[0]?.uri) return;

            onChangeImageUri(result.assets[0].uri);
            break;
          }
          case ACTION_SHEET_CANCEL_INDEX:
          default:
            break;
        }
      },
    );
  };

  return (
    <View className="mb-4">
      {!imageUri ? (
        <IconButton text="Add image" iconName="camera" onPress={pickImage} />
      ) : null}
      {imageUri ? (
        <View className="relative mx-auto w-full p-4">
          <Image
            alt="The image you just selected"
            source={{ uri: imageUri }}
            style={{
              width: "100%",
              aspectRatio: "4/3",
            }}
          />
          <IconOnlyButton
            style="absolute top-6 right-14 z-50 bg-gray-100/60 rounded-full"
            iconFont="material"
            iconName="refresh"
            onPress={pickImage}
          />
          <IconOnlyButton
            style="absolute top-6 right-5 z-50 bg-gray-100/60 rounded-full"
            iconFont="material"
            iconName="close"
            onPress={() => {
              onChangeImageUri(null);
            }}
          />
        </View>
      ) : null}
    </View>
  );
}
