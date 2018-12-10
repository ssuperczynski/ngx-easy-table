export enum API {
  contextMenuClicked,
}

export type ApiType = { type: API } & { value?: any | null};
