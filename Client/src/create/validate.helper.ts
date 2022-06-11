export const validateValues = (
  type: string,
  inputFields: { [key: string]: string }[]
) => {
  return !!type && inputFields.every((i) => i.name);
};
