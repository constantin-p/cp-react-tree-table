import { ROW_DEFAULT_HEIGHT } from './constants';


export type RowData = any;

export type RowMetadata = {
  depth: number;
  index: number;

  height: number;
  hasChildren: boolean;
}

export type RowState = {
  isVisible: boolean;
  isExpanded: boolean;
  top: number;
}

export class RowModel {
  static DEFAULT_HEIGHT: number = ROW_DEFAULT_HEIGHT;

  readonly data: RowData;
  readonly metadata: RowMetadata;
  readonly $state: RowState;

  constructor(data: RowData, metadata: RowMetadata, state: RowState) {
    this.data = data;
    this.$state = state;
    this.metadata = metadata;
  }
}

export interface RowAPI {
  toggleChildren: () => void;
  updateData: (newData: RowData) => void;
}

export default class Row extends RowModel implements RowAPI {
  // RowAPI
  public toggleChildren: () => void;
  public updateData: (newData: RowData) => void;

  constructor(model: RowModel, api: RowAPI) {
    // RowModel
    super(model.data, model.metadata, model.$state)

    // RowAPI
    this.toggleChildren = api.toggleChildren;
    this.updateData = api.updateData;
  }
}