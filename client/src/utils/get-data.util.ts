import { DataRes } from "../types/res.interface";

export const getData = (path: string) => {
  return fetch(path)
    .then((res) => res.json())
    .then((data) => data);
};

export const displaySelected = (
  data: DataRes[]
): { name: string; id: string }[] => {
  if (!data || !data.length) return [];
  return data[0].values;
};
