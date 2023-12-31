import Toast from "react-native-toast-message";

const DEFAULT_SUCCESS_TOAST_TIME = 1_000;
const DEFAULT_ERROR_TOAST_TIME = 3_000;

function showToast(text: string, type: "success" | "error") {
  Toast.show({
    type: type,
    text1: text,
    position: "bottom",
    visibilityTime:
      type === "success"
        ? DEFAULT_SUCCESS_TOAST_TIME
        : DEFAULT_ERROR_TOAST_TIME,
  });
}

export function showSuccessToast(text: string) {
  showToast(text, "success");
}

export function showErrorToast(text: string) {
  showToast(text, "error");
}
