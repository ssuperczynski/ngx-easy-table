export enum API {
  rowContextMenuClicked,
}

export type ApiType = { type: API } & { value?: any | null};
