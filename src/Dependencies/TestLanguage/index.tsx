export const TestLanguage = (
  label: string,
  multilingual: { textKey: string; context: string }[]
) => {
  let result = label;
  if (!multilingual) return label;
  for (let i = 0; i < multilingual?.length; i++) {
    if (label === multilingual[i].textKey) {
      result = multilingual[i].context;
      break;
    }
  }
  return result;
};
