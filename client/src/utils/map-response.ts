import { DataRes, Res } from "../types/res.interface";

export const MapResponse = (res: Res): DataRes[] => {
  return res.types;
};
