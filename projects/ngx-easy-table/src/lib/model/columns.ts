import { TemplateRef } from '@angular/core';

export interface Columns {
  key: string;
  title: string;
  placeholder?: string;
  width?: string;
  cellTemplate?: TemplateRef<any>;
  orderEnabled?: boolean;
  orderEventOnly?: boolean;
  searchEnabled?: boolean;
  orderBy?: string;
  cssClass?: { name: string };
  pinned?: boolean;
  headerActionTemplate?: TemplateRef<any>;
}
