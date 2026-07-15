// Deep-merge a locale's messages over the English base so any key missing from a
// translation falls back to English at runtime (adapted from pdf-shuttle). This
// keeps the UI fully functional for partially translated locales without ever
// showing a raw message key.

type Messages = { [key: string]: string | Messages };

export function mergeWithFallback(
  localeMessages: Messages,
  englishMessages: Messages,
): Messages {
  const result: Messages = {};

  const copy = (source: Messages, target: Messages) => {
    for (const key of Object.keys(source)) {
      const value = source[key];
      if (typeof value === "string") {
        target[key] = value;
      } else {
        target[key] = {};
        copy(value, target[key] as Messages);
      }
    }
  };
  copy(englishMessages, result);

  const merge = (source: Messages, target: Messages) => {
    for (const key of Object.keys(source)) {
      const value = source[key];
      if (typeof value === "string") {
        target[key] = value;
      } else if (typeof target[key] === "object" && target[key] !== null) {
        merge(value, target[key] as Messages);
      } else {
        target[key] = {};
        merge(value, target[key] as Messages);
      }
    }
  };
  merge(localeMessages, result);

  return result;
}
