export interface DataRes {
  _id: string;
  id: string;
  type: string;
  values: { name: string; id: string }[];
}
export interface Res {
  types: DataRes[];
}
