export enum API {
  rowContextMenuClicked,
  toolPanelClicked,
}

export type ApiType = { type: API } & { value?: any | null};
