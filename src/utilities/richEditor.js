import { Value } from "slate";

export const getValueFromJson = jsonValue => {
  return Value.fromJSON(JSON.parse(jsonValue));
};
